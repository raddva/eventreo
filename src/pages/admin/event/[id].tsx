import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/Admin/Event/DetailEvent";

const AdminDetailEventPage = () => {
    return (
        <DashboardLayout title="Detail Event" description="Manage information for this category." type="admin">
            <DetailEvent />
        </DashboardLayout >
    );
}

export default AdminDetailEventPage;