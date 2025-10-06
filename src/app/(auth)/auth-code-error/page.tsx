export default function AuthCodeError() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <h2 className="mt-6 text-3xl font-bold text-foreground">
                        Authentication Error
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        There was an error with your authentication. Please try again.
                    </p>
                </div>
                <div>
                    <a
                        href="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                    >
                        Return to Home
                    </a>
                </div>
            </div>
        </div>
    )
}
