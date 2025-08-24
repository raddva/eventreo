import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import RemoveCategoryModal from "./RemoveCategoryModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Category = () => {
    const { push, isReady, query } = useRouter();
    const { dataCategory, isLoadingCategory, refetchCategory, isRefetchingCategory, selectedId, setSelectedId } = useCategory();
    const addCategoryModal = useDisclosure();
    const removeCategoryModal = useDisclosure();
    const { setUrl } = useChangeUrl();

    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category]

            switch (columnKey) {
                case "icon":
                    return (
                        <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
                    )
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDelete={() => { setSelectedId(`${category._id}`); removeCategoryModal.onOpen(); }}
                            onPressButtonDetail={() => push(`category/${category._id}`)} />
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
                    emptyContent="Category is Empty"
                    renderCell={renderCell}
                    columns={COLUMN_LIST_CATEGORY}
                    data={dataCategory?.data}
                    isLoading={isLoadingCategory || isRefetchingCategory}
                    buttonTopContentLabel="Create Category"
                    onClickButtonTopContent={addCategoryModal.onOpen}
                    totalPages={dataCategory?.pagination.totalPages}
                />
            )}
            <AddCategoryModal {...addCategoryModal} refetchCategory={refetchCategory} />
            <RemoveCategoryModal {...removeCategoryModal} refetchCategory={refetchCategory} selectedId={selectedId} setSelectedId={setSelectedId} />
        </section>
    )
}

export default Category;