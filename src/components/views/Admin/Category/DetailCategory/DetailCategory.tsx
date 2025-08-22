import { Tab, Tabs } from "@heroui/tabs"
import useDetailCategory from "./useDetailCategory"
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";

const DetailCategory = () => {
    const { dataCategory } = useDetailCategory();

    return (
        <Tabs aria-label="Options">
            <Tab key="icon" title="Icon">
                <IconTab currentIcon={dataCategory?.icon} />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab dataCategory={dataCategory} />
            </Tab>
        </Tabs>
    )
}

export default DetailCategory