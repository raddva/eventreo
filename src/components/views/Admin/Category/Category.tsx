import DataTable from "@/components/ui/DataTable";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci"
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";

const Category = () => {
    const { push, isReady, query } = useRouter();
    const { dataCategory, isLoadingCategory, setUrl, currentLimit, currentPage, currentSearch, refetchCategory, isRefetchingCategory, handleChangeLimit, handleChangePage, handleClearSearch, handleSearch } = useCategory();

    useEffect(() => {
        if (isReady) {
            setUrl()
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
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <CiMenuKebab className="text-default-700" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Category Actions"
                                items={[
                                    { key: "detail", label: "Detail Category" },
                                    { key: "delete", label: "Delete Category" },
                                ]}
                            >
                                {(item) => (
                                    <DropdownItem
                                        key={item.key}
                                        className={item.key === "delete" ? "text-danger-500" : ""}
                                        onPress={
                                            item.key === "detail"
                                                ? () => push(`admin/category/${category._id}`)
                                                : undefined
                                        }
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown >
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
                    currentPage={Number(currentPage)}
                    renderCell={renderCell}
                    columns={COLUMN_LIST_CATEGORY}
                    data={dataCategory?.data}
                    limit={String(currentLimit)}
                    isLoading={isLoadingCategory || isRefetchingCategory}
                    onChangeLimit={handleChangeLimit}
                    onChangePage={handleChangePage}
                    onChangeSearch={handleSearch}
                    onClearSearch={handleClearSearch}
                    buttonTopContentLabel="Create Category"
                    onClickButtonTopContent={() => { }}
                    totalPages={dataCategory?.pagination.totalPages}
                />
            )}
        </section>
    )
}

export default Category;