import { Tab, Tabs } from "@heroui/tabs"
import useProfile from "./useProfile"
import PictureTab from "./PictureTab";
import InfoTab from "./InfoTab";
import SecurityTab from "./SecurityTab";

const Profile = () => {
    const {
        dataProfile,
        handleUpdateProfile,
        isPendingMutateUpdateProfile,
        isSuccessMutateUpdateProfile,
    } = useProfile();

    return (
        <Tabs aria-label="Options">
            <Tab key="picture" title="Picture">
                <PictureTab
                    currentPicture={dataProfile?.profilePicture}
                    onUpdate={handleUpdateProfile}
                    isPendingUpdate={isPendingMutateUpdateProfile}
                    isSuccessUpdate={isSuccessMutateUpdateProfile} />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab
                    profileData={dataProfile}
                    onUpdate={handleUpdateProfile}
                    isPendingUpdate={isPendingMutateUpdateProfile}
                    isSuccessUpdate={isSuccessMutateUpdateProfile} />
            </Tab>
            <Tab key="security" title="Security">
                <SecurityTab />
            </Tab>
        </Tabs>
    )
}

export default Profile