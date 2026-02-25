'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="p-8 text-center bg-red-50 text-red-800 rounded-xl m-4">
            <h2 className="text-lg font-bold mb-2">Something went wrong!</h2>
            <p className="mb-4 text-sm">{error.message}</p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
                Try again
            </button>
        </div>
    );
}
