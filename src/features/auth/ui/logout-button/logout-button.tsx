"use client"

import { Button } from '@/shared/ui'
import { Loader2, LogOut } from 'lucide-react'
import { useAuth } from '@/features/auth'

interface LogoutButtonProps {
    variant?: 'button' | 'icon'
    children?: React.ReactNode
    className?: string
}

export function LogoutButton({
    variant = 'button',
    children,
    className
}: LogoutButtonProps) {
    const { signOut, loading } = useAuth()

    if (variant === 'icon') {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                disabled={loading}
                className={`${className} cursor-pointer`}
                title="Sign out"
            >
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <LogOut className="h-4 w-4" />
                )}
            </Button>
        )
    }

    return (
        <Button
            variant="outline"
            onClick={signOut}
            disabled={loading}
            className={`${className} cursor-pointer`}
        >
            {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <LogOut className="mr-2 h-4 w-4" />
            )}
            {children ?? 'Sign Out'}
        </Button>
    )
}
