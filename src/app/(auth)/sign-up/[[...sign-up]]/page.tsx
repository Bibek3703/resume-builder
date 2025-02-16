import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <SignUp
                path="/sign-up"
                routing="path"
                signInUrl="/sign-in"
                appearance={{
                    variables: {
                        colorPrimary: "#2563eb",
                    },
                    elements: {
                        rootBox: "w-full max-w-md",
                        card: "shadow-lg rounded-lg p-8",
                        formFieldInput:
                            "border-gray-300 focus:ring-2 focus:ring-blue-500",
                        formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                    },
                }}
            />
        </div>
    );
}
