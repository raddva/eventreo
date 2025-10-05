import DataTable from "@/components/ui/DataTable";
import { Chip } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useTransaction from "./useTransaction";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constants";
import { convertIDR } from "@/utils/currency";
const Transaction = () => {
    const { push, isReady, query } = useRouter();
    const { dataTransaction, isLoadingTransaction, refetchTransaction, isRefetchingTransaction } = useTransaction();

    const { setUrl } = useChangeUrl();

    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (transaction: Record<string, unknown>, columnKey: Key) => {
            const cellValue = transaction[columnKey as keyof typeof transaction]

            switch (columnKey) {
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() => push(`/member/transaction/${transaction._id}`)}
                            hideButtonDelete />
                    )
                case "status":
                    return (
                        <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue as ReactNode}
                        </Chip>
                    )
                case "total":
                    return convertIDR(Number(cellValue))
                default:
                    return cellValue as ReactNode;
            }
        }, [push],
    );
    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    emptyContent="Transaction is Empty"
                    renderCell={renderCell}
                    columns={COLUMN_LIST_TRANSACTION}
                    data={dataTransaction?.data}
                    isLoading={isLoadingTransaction || isRefetchingTransaction}
                    totalPages={dataTransaction?.pagination.totalPages}
                />
            )}
        </section>
    )
}

export default Transaction;