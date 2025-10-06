import { DashboardContent } from "@/components/dashboard/dashboard-content";
    import { ProtectedRoute } from "@/features/auth";

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}
