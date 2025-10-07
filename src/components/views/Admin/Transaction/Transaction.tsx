import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useTransaction from "./useTransaction";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constants";
import { convertIDR } from "@/utils/currency";
import RemoveTransactionModal from "./RemoveTransactionModal";
const Transaction = () => {
    const { push, isReady, query } = useRouter();
    const { dataTransaction, isLoadingTransaction, refetchTransaction, isRefetchingTransaction, selectedId, setSelectedId } = useTransaction();
    const { setUrl } = useChangeUrl();
    const removeTransactionModal = useDisclosure();

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
                            onPressButtonDetail={() => push(`/member/transaction/${transaction?.orderId}`)}
                            onPressButtonDelete={() => { setSelectedId(`${transaction?.orderId}`); removeTransactionModal.onOpen(); }}
                        />
                    )
                case "status":
                    return (
                        <Chip color={cellValue === "COMPLETED" ? "success" : "warning"} size="sm" variant="flat" className="capitalize">
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
            <RemoveTransactionModal {...removeTransactionModal} refetchTransaction={refetchTransaction} selectedId={selectedId} setSelectedId={setSelectedId} />
        </section>
    )
}

export default Transaction;