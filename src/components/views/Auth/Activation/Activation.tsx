import { Button } from "@heroui/button";
import Image from "next/image"
import { useRouter } from "next/router";

interface PropTypes {
    status: "success" | "failed"

}

const Activation = (props: PropTypes) => {
    const router = useRouter();
    const { status } = props;
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
                <h1 className="text-3xl font-bold text-primary-400">
                    {status === 'success' ? "Activation Success!" : "Activation Failed"}
                </h1>
                <p className="text-xl font-bold text-default-500">
                    {status === 'success' ? "Thank you for register account in Eventreo" : "Invalid confirmation code."}
                </p>

                <Button className="mt-4 w-fit" variant="bordered" color="primary" onClick={() => router.push("/")}>Back to Homepage</Button>
            </div>
        </div>
    )
}

export default Activation;