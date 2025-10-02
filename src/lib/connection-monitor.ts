import { useState, useEffect } from 'react'

interface ConnectionState {
  isOnline: boolean
  lastCheck: number
  retryCount: number
  maxRetries: number
}

class ConnectionMonitor {
  private state: ConnectionState = {
    isOnline: typeof window !== 'undefined' ? navigator.onLine : true,
    lastCheck: Date.now(),
    retryCount: 0,
    maxRetries: 3
  }

  private listeners: Set<(isOnline: boolean) => void> = new Set()

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline.bind(this))
      window.addEventListener('offline', this.handleOffline.bind(this))
    }
  }

  private handleOnline = () => {
    this.state.isOnline = true
    this.state.retryCount = 0
    this.notifyListeners(true)
  }

  private handleOffline = () => {
    this.state.isOnline = false
    this.notifyListeners(false)
  }

  private notifyListeners(isOnline: boolean) {
    this.listeners.forEach(listener => {
      try {
        listener(isOnline)
      } catch (error) {
        console.error("Error in connection listener:", error)
      }
    })
  }

  public addListener(listener: (isOnline: boolean) => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  public isOnline(): boolean {
    return this.state.isOnline
  }

  public async checkConnection(): Promise<boolean> {
    if (typeof window === 'undefined') return true

    try {
      // Try to fetch a small resource to check connectivity
      const response = await fetch('/api/health', {
        method: 'HEAD',
        cache: 'no-cache',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })

      const isOnline = response.ok
      this.state.isOnline = isOnline
      this.state.lastCheck = Date.now()

      if (isOnline) {
        this.state.retryCount = 0
      } else {
        this.state.retryCount++
      }

      this.notifyListeners(isOnline)
      return isOnline
    } catch (error) {
      console.warn("Connection check failed:", error)
      this.state.isOnline = false
      this.state.retryCount++
      this.notifyListeners(false)
      return false
    }
  }

  public shouldRetry(): boolean {
    return this.state.retryCount < this.state.maxRetries
  }

  public getRetryDelay(): number {
    // Exponential backoff: 1s, 2s, 4s
    return Math.min(1000 * Math.pow(2, this.state.retryCount), 10000)
  }

  public reset() {
    this.state.retryCount = 0
    this.state.isOnline = typeof window !== 'undefined' ? navigator.onLine : true
  }
}

// Singleton instance
export const connectionMonitor = new ConnectionMonitor()

// Hook for React components
export function useConnectionMonitor() {
  const [isOnline, setIsOnline] = useState(() => {
    // Safe initialization for SSR
    if (typeof window === 'undefined') return true
    return connectionMonitor.isOnline()
  })

  useEffect(() => {
    // Only set up listeners on client side
    if (typeof window === 'undefined') return

    const unsubscribe = connectionMonitor.addListener(setIsOnline)
    return unsubscribe
  }, [])

  return {
    isOnline,
    checkConnection: () => connectionMonitor.checkConnection(),
    shouldRetry: () => connectionMonitor.shouldRetry(),
    getRetryDelay: () => connectionMonitor.getRetryDelay(),
    reset: () => connectionMonitor.reset()
  }
}

