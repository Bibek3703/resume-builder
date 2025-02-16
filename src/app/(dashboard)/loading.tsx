import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <div className="space-y-8">
            <div className="flex gap-4">
                <Skeleton className="h-40 w-64" />
                <Skeleton className="h-40 w-64" />
                <Skeleton className="h-40 w-64" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    );
}
