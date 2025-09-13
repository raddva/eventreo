import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Event from "@/components/views/Event";

const EventPage = () => {
    return (
        <LandingPageLayout title="Eventreo - Events for Everyone">
            <Event />
        </LandingPageLayout>
    );
}

export default EventPage;