import { DashboardNavbar } from "@/components/DashboardNavbar";

export const metadata = {
    title: "Dashboard - Resume Builder",
    description: "Manage your resumes and account",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <DashboardNavbar />
            <main className="p-4 md:p-8">{children}</main>
        </div>
    );
}
