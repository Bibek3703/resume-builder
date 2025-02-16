import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
                appearance={{
                    elements: {
                        rootBox: "w-full max-w-md",
                        card: "shadow-lg rounded-lg",
                        headerTitle: "text-2xl font-bold text-gray-800",
                        headerSubtitle: "text-gray-600",
                        socialButtonsBlockButton:
                            "border-gray-300 hover:bg-gray-50",
                        formFieldInput:
                            "border-gray-300 focus:ring-2 focus:ring-blue-500",
                        formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                        footerActionText: "text-gray-600",
                        footerActionLink: "text-blue-600 hover:text-blue-700",
                    },
                }}
            />
        </div>
    );
}
