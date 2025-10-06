"use client"

import { useState } from 'react'
import { Button, Input, Label } from '@/shared/ui'
import { signInWithEmail, signInWithGoogle } from '@/actions/auth'
import { validateLoginForm } from '@/shared/lib/validations'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import type { LoginCredentials } from '@/shared/lib/validations/auth'

interface LoginFormProps {
    onSuccess?: () => void
    className?: string
}

export function LoginForm({ onSuccess, className }: LoginFormProps) {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate form        
        const errors = validateLoginForm(credentials)
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors)
            return
        }

        setValidationErrors({})

        try {
            setIsLoading(true)
            setError(null)
            await signInWithEmail(credentials)
            onSuccess?.()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true)
            setError(null)
            await signInWithGoogle()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Google login failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({ ...prev, [field]: e.target.value }))
        // Clear validation error for this field
        if (validationErrors[field]) {
            setValidationErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    return (
        <div className={className}>
            {/* Google Login */}
            <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent hover:bg-accent/10 hover:scale-[1.02] active:scale-[0.98]"
                onClick={handleGoogleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 1c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                )}
                Continue with Google
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with email
                    </span>
                </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={credentials.email}
                        onChange={handleInputChange('email')}
                        className={validationErrors.email ? 'border-destructive' : ''}
                        required
                    />
                    {validationErrors.email && (
                        <p className="text-sm text-destructive">{validationErrors.email}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleInputChange('password')}
                            className={validationErrors.password ? 'border-destructive' : ''}
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    {validationErrors.password && (
                        <p className="text-sm text-destructive">{validationErrors.password}</p>
                    )}
                </div>

                {/* API Error */}
                {error && (
                    <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full hover:scale-[1.02] active:scale-[0.98] disabled:scale-100"
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                </Button>
            </form>
        </div>
    )
}
