// Server-side rate limiting using in-memory store
// In production, use Redis or database for persistence

interface RateLimitEntry {
    count: number;
    resetTime: number;
    lastRequest: number;
}

class ServerRateLimit {
    private store = new Map<string, RateLimitEntry>();
    private cleanupInterval: NodeJS.Timeout;

    constructor() {
        // Clean up expired entries every 5 minutes
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, 5 * 60 * 1000);
    }

    private cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.store.entries()) {
            if (entry.resetTime < now) {
                this.store.delete(key);
            }
        }
    }

    private getKey(identifier: string, type: 'openai' | 'n8n'): string {
        return `${type}:${identifier}`;
    }

    checkRateLimit(
        identifier: string,
        type: 'openai' | 'n8n',
        windowMs: number,
        maxRequests: number = 1
    ): { allowed: boolean; remainingTime: number; resetTime: number } {
        const key = this.getKey(identifier, type);
        const now = Date.now();
        const entry = this.store.get(key);

        if (!entry || entry.resetTime < now) {
            // No entry or expired, allow request
            this.store.set(key, {
                count: 1,
                resetTime: now + windowMs,
                lastRequest: now
            });
            return { allowed: true, remainingTime: 0, resetTime: now + windowMs };
        }

        if (entry.count >= maxRequests) {
            // Rate limit exceeded
            return {
                allowed: false,
                remainingTime: entry.resetTime - now,
                resetTime: entry.resetTime
            };
        }

        // Increment count
        entry.count++;
        entry.lastRequest = now;
        this.store.set(key, entry);

        return { allowed: true, remainingTime: 0, resetTime: entry.resetTime };
    }

    getRemainingTime(identifier: string, type: 'openai' | 'n8n'): number {
        const key = this.getKey(identifier, type);
        const entry = this.store.get(key);

        if (!entry) return 0;

        const now = Date.now();
        return Math.max(0, entry.resetTime - now);
    }

    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
}

// Singleton instance
export const serverRateLimit = new ServerRateLimit();

// Helper function to get client identifier
export function getClientIdentifier(request: Request): string {
    // Try to get IP from various headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');

    const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';

    // In production, you might want to hash the IP for privacy
    return ip;
}
