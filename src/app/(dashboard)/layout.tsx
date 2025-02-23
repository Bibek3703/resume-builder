import { DashboardNavbar } from "@/components/DashboardNavbar";
import { ProgressBar } from "@/components/ProgressBar";
import BillingProvider from "@/contexts/billing-context";
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
        <div className="min-h-screen">
            <BillingProvider>
                <ProgressBar />
                {/* <ErrorToast /> */}
                <DashboardNavbar userData={userData} />
                <main className="p-4 md:p-8">{children}</main>
            </BillingProvider>
        </div>
    );
}
