"use client"

import { Button } from '@/shared/ui'
import { useLogout } from '../../model/use-logout'
import { Loader2, LogOut } from 'lucide-react'

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
    const { logout, isLoading } = useLogout()

    if (variant === 'icon') {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                disabled={isLoading}
                className={className}
                title="Sign out"
            >
                {isLoading ? (
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
            onClick={logout}
            disabled={isLoading}
            className={className}
        >
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <LogOut className="mr-2 h-4 w-4" />
            )}
            {children ?? 'Sign Out'}
        </Button>
    )
}
