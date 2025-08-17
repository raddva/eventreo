import DataTable from "@/components/ui/DataTable";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci"
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { LIMIT_LISTS } from "@/constants/list.constants";

const Category = () => {
    const { push } = useRouter();
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
                            <DropdownMenu>
                                <DropdownItem key="detail-category-button" onPress={() => push(`admin/category/${category._id}`)}>Detail Category</DropdownItem>
                                <DropdownItem key="delete-category" className="text-danger-500">Delete Category</DropdownItem>
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
            <DataTable
                emptyContent="Category is Empty"
                currentPage={1}
                renderCell={renderCell}
                columns={COLUMN_LIST_CATEGORY}
                data={[
                    {
                        _id: "123",
                        name: "Category",
                        description: "Abcdbdv",
                        icon: "/images/general/logo.svg"
                    }
                ]}
                limit={LIMIT_LISTS[0].label}
                onChangeLimit={() => { }}
                onChangePage={() => { }}
                onChangeSearch={() => { }}
                onClearSearch={() => { }}
                buttonTopContentLabel="Create Category"
                onClickButtonTopContent={() => { }}
                totalPages={2}
            />
        </section>
    )
}

export default Category;