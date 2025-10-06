export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterData {
    name: string
    email: string
    password: string
    confirmPassword?: string
}

export interface AuthResponseData {
    user: any
    session: any
}

export interface AuthError {
    message: string
    code?: string
}

export interface AuthState {
    isLoading: boolean
    error: string | null
}

export interface AuthResult<T = any> {
    data: T | null
    error: AuthError | null
}
