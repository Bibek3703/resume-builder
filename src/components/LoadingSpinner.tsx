export function LoadingSpinner() {
    return (
        <div className="animate-spin h-5 w-5 text-blue-600">
            <svg
                className="h-full w-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2V6M12 18V22M6 12H2M22 12H18M17.6568 17.6568L19.0711 19.0711M6.34315 6.34315L4.92893 4.92893"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}
