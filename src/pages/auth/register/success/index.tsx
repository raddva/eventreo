import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterSuccess from "@/components/views/Auth/RegisterSuccess";

const SuccessRegisterPage = () => {
    return (
        <AuthLayout title="Eventreo | Registration Success">
            <RegisterSuccess />
        </AuthLayout >
    );
}

export default SuccessRegisterPage;