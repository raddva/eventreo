import { Tab, Tabs } from "@heroui/tabs"
import useDetailEvent from "./useDetailEvent"
import BannerTab from "./BannerTab";
import InfoTab from "./InfoTab";
import LocationTab from "./LocationTab";

const DetailEvent = () => {
    const {
        dataEvent,
        handleUpdateEvent,
        handleUpdateInfo,
        handleUpdateLocation,
        isPendingMutateUpdateEvent,
        isSuccessMutateUpdateEvent,
        dataDefaultRegion,
        isPendingDefaultRegion
    } = useDetailEvent();

    return (
        <Tabs aria-label="Options">
            <Tab key="banner" title="Banner">
                <BannerTab currentBanner={dataEvent?.banner}
                    onUpdate={handleUpdateEvent}
                    isPendingUpdate={isPendingMutateUpdateEvent}
                    isSuccessUpdate={isSuccessMutateUpdateEvent} />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab dataEvent={dataEvent}
                    onUpdate={handleUpdateInfo}
                    isPendingUpdate={isPendingMutateUpdateEvent}
                    isSuccessUpdate={isSuccessMutateUpdateEvent} />
            </Tab>
            <Tab key="location" title="Location">
                <LocationTab dataEvent={dataEvent}
                    onUpdate={handleUpdateLocation}
                    dataDefaultRegion={dataDefaultRegion?.data.data[0]?.name}
                    isPendingDefaultRegion={isPendingDefaultRegion}
                    isPendingUpdate={isPendingMutateUpdateEvent}
                    isSuccessUpdate={isSuccessMutateUpdateEvent} />
            </Tab>
        </Tabs>
    )
}

export default DetailEvent