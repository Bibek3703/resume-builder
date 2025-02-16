import { DashboardNavbar } from "@/components/DashboardNavbar";
import { ErrorToast } from "@/components/ErrorToast";
import { ProgressBar } from "@/components/ProgressBar";
import { getNavbarUserData } from "@/lib/user";

export const metadata = {
    title: "Dashboard - Resume Builder",
    description: "Manage your resumes and account",
};

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userData = await getNavbarUserData();
    return (
        <div className="min-h-screen bg-background">
            <ProgressBar />
            {/* <ErrorToast /> */}
            <DashboardNavbar userData={userData} />
            <main className="p-4 md:p-8">{children}</main>
        </div>
    );
}
