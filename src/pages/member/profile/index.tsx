import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Member/Profile";

const ProfileMemberPage = () => {
    return (
        <DashboardLayout title="Profile" description="Manage Profile and Security" type="member">
            <Profile />
        </DashboardLayout >
    );
}

export default ProfileMemberPage;