import { Tab, Tabs } from "@heroui/tabs"
import useDetailBanner from "./useDetailBanner"
import ImageTab from "./ImageTab/ImageTab";
import InfoTab from "./InfoTab";

const DetailBanner = () => {
    const {
        dataBanner,
        handleUpdateBanner,
        isPendingMutateUpdateBanner,
        isSuccessMutateUpdateBanner,
    } = useDetailBanner();

    return (
        <Tabs aria-label="Options">
            <Tab key="image" title="Image">
                <ImageTab currentImage={dataBanner?.image}
                    onUpdate={handleUpdateBanner}
                    isPendingUpdate={isPendingMutateUpdateBanner}
                    isSuccessUpdate={isSuccessMutateUpdateBanner} />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab dataBanner={dataBanner}
                    onUpdate={handleUpdateBanner}
                    isPendingUpdate={isPendingMutateUpdateBanner}
                    isSuccessUpdate={isSuccessMutateUpdateBanner} />
            </Tab>
        </Tabs>
    )
}

export default DetailBanner