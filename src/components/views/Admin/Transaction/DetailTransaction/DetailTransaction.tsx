import { Card, CardBody } from "@heroui/card";
import useDetailTransaction from "./useDetailTransaction";
import { Skeleton } from "@heroui/skeleton";
import { convertIDR } from "@/utils/currency";
import { Chip } from "@heroui/chip";
import { QRCodeSVG } from "qrcode.react";
import { convertTime } from "@/utils/date";
import { Button } from "@heroui/button";
import Link from "next/link";
import Script from "next/script";
import environment from "@/config/environment";

const DetailTransaction = () => {
    const {
        eventData,
        orderData,
        ticketData,
    } = useDetailTransaction();

    return (
        <Card className="px-5 py-4">
            <Script
                src={environment.MIDTRANS_SNAP_URL}
                data-client-key={environment.MIDTRANS_CLIENT_KEY}
                strategy="lazyOnload"
            />
            <CardBody className="gap-8">
                <div className="flex flex-col gap-2">
                    <h4 className="font-bold">Order: </h4>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <div>
                            <p className="text-sm font-semibold">Order ID:</p>
                            <Skeleton
                                isLoaded={!!orderData?.orderId}
                                className="h-4 rounded-md"
                            >
                                <p className="text-sm">{orderData?.orderId}</p>
                            </Skeleton>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Ticket:</p>
                            <Skeleton
                                isLoaded={!!ticketData?.name}
                                className="h-4 rounded-md"
                            >
                                <p className="text-sm">{`${ticketData?.name} (${convertIDR(ticketData?.price)}) x ${ticketData?.quantity}`}</p>
                            </Skeleton>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Total:</p>
                            <Skeleton
                                isLoaded={!!orderData?.total}
                                className="h-4 rounded-md"
                            >
                                <p className="text-sm">{convertIDR(orderData?.total)}</p>
                            </Skeleton>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Status:</p>
                            <Skeleton
                                isLoaded={!!orderData?.status}
                                className="h-4 rounded-md"
                            >
                                <Chip
                                    className="capitalize"
                                    color={
                                        orderData?.status === "COMPLETED" ? "success" : "warning"
                                    }
                                    variant="flat"
                                    size="sm"
                                >
                                    {orderData?.status}
                                </Chip>
                            </Skeleton>
                        </div>
                    </div>
                </div>
                {orderData?.status === "COMPLETED" && (
                    <div className="flex flex-col gap-2">
                        <h4 className="font-bold">Ticket:</h4>
                        <div className="flex flex-col gap-4">
                            {orderData?.vouchers.map((voucher: { voucherId: string }) => (
                                <Card shadow="sm" className="p-4 pt-6 lg:p-2" key={`voucher-${voucher.voucherId}`}>
                                    <CardBody className="gap-8 lg:flex-row">
                                        <div className="mx-auto w-2/3 lg:m-0 lg:w-1/5 mb-4">
                                            <QRCodeSVG
                                                value={voucher.voucherId}
                                                className="!h-full !w-full" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-bold text-primary">{eventData?.name}</h2>
                                            <div className="font-bold">
                                                <p className="text-foreground-500">Date</p>
                                                <p className="text-primary">
                                                    {`${convertTime(eventData?.startDate)} - ${convertTime(eventData?.endDate)}`}
                                                </p>
                                            </div>
                                            <div className="font-bold">
                                                <p className="text-foreground-500">Location</p>
                                                <p className="text-primary">
                                                    {eventData?.isOnline ? "Online" : "Offline"}
                                                </p>
                                            </div>
                                            {eventData?.isOnline && (
                                                <Button
                                                    as={Link}
                                                    href={`${eventData?.location?.address}`}
                                                    variant="bordered"
                                                    color="primary"
                                                    className="w-fit"
                                                >
                                                    Join Now
                                                </Button>
                                            )}
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    )
}

export default DetailTransaction;