export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-blue-600">404</h1>
                    <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Page Not Found</h2>
                    <p className="text-gray-600">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>
                <a
                    href="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
