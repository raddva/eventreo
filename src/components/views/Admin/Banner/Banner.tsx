import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_BANNER } from "./Banner.constants";
import useBanner from "./useBanner";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Banner = () => {
    const { push, isReady, query } = useRouter();
    const { dataBanner, isLoadingBanner, refetchBanner, isRefetchingBanner, selectedId, setSelectedId } = useBanner();
    const addBannerModal = useDisclosure();
    const removeBannerModal = useDisclosure();
    const { setUrl } = useChangeUrl();

    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (banner: Record<string, unknown>, columnKey: Key) => {
            const cellValue = banner[columnKey as keyof typeof banner]

            switch (columnKey) {
                case "image":
                    return (
                        <Image src={`${cellValue}`} alt="image" width={300} height={200} />
                    )
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDelete={() => { setSelectedId(`${banner._id}`); removeBannerModal.onOpen(); }}
                            onPressButtonDetail={() => push(`banner/${banner._id}`)} />
                    )
                case "isShow":
                    return (
                        <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue == true ? "Shown" : "Not Shown"}
                        </Chip>
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [push],
    );
    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    emptyContent="Banner is Empty"
                    renderCell={renderCell}
                    columns={COLUMN_LIST_BANNER}
                    data={dataBanner?.data}
                    isLoading={isLoadingBanner || isRefetchingBanner}
                    buttonTopContentLabel="Create Banner"
                    onClickButtonTopContent={addBannerModal.onOpen}
                    totalPages={dataBanner?.pagination.totalPages}
                />
            )}
            {/* <AddBannerModal {...addBannerModal} refetchBanner={refetchBanner} />
            <RemoveBannerModal {...removeBannerModal} refetchBanner={refetchBanner} selectedId={selectedId} setSelectedId={setSelectedId} /> */}
        </section>
    )
}

export default Banner;