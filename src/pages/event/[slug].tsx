import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import DetailEvent from "@/components/views/DetailEvent";

const DetailEventPage = () => {
    return (
        <LandingPageLayout title="Eventreo - Events for Everyone">
            <DetailEvent />
        </LandingPageLayout>
    );
}

export default DetailEventPage;