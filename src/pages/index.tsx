import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Home from "@/components/views/Home";

const HomePage = () => {
  return (
    <LandingPageLayout title="Eventreo - Events for Everyone">
      <Home />
    </LandingPageLayout>
  );
}

export default HomePage;