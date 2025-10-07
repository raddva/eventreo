import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Admin/Transaction/DetailTransaction";

const DetailTransactionAdminPage = () => {
    return (
        <DashboardLayout title="Detail Transaction" description="Detail Information for Specific Transaction" type="admin">
            <DetailTransaction />
        </DashboardLayout >
    );
}

export default DetailTransactionAdminPage;