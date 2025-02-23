import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="border rounded-[0.75rem] border-gray-600">
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
                            card: "shadow-lg rounded-lg",
                            headerTitle: "text-2xl font-bold text-foreground",
                            headerSubtitle: "text-gray-600",
                            socialButtonsBlockButton:
                                "border-gray-300 hover:border-gray-50 hover:bg-primary/5 duration-300",
                            formFieldInput:
                                "border-gray-300 focus:ring-2 focus:ring-blue-500",
                            formButtonPrimary:
                                "bg-blue-500 hover:bg-blue-600 !border-none !shadow-none !outline-none h-10 text-md",
                            footerActionText: "text-gray-600",
                            footerActionLink:
                                "text-primary hover:text-blue-500 duration-300",
                        },
                    }}
                />
            </div>
        </div>
    );
}
