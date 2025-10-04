import { Button } from "@heroui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import usePayment from "./usePayment";
import { useEffect } from "react";

const Payment = () => {
    const router = useRouter();
    const { mutateUpdateOrderStatus } = usePayment();
    const { order_id, status } = router.query;

    useEffect(() => {
        if (router.isReady) {
            mutateUpdateOrderStatus();
        }
    }, [router.isReady])

    return (
        <div className="flex flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image
                    src="/images/general/logo.svg"
                    alt="Eventreo Logo"
                    width={270}
                    height={270}
                />
                <Image
                    src={status === 'success' ? "/images/illustrations/success.svg" : "/images/illustrations/pending.svg"}
                    alt="Auth"
                    className="w-1/3"
                    width={128}
                    height={128}
                />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold text-primary-400 capitalize">
                    Transaction {status}
                </h1>
                <Button className="mt-4 w-fit" variant="bordered" color="primary" onClick={() => router.push(`/member/transaction/${order_id}`)}>Check your transaction</Button>
            </div>
        </div>
    )
}

export default Payment;