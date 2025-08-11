import { Button } from "@heroui/button";
import Image from "next/image"
import { useRouter } from "next/router";

const RegisterSuccess = () => {
    const router = useRouter();
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
                    src="/images/illustrations/send-mail.svg"
                    alt="Auth"
                    className="w-1/3"
                    width={128}
                    height={128}
                />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold text-primary-400">
                    Mail Sent!
                </h1>
                <p className="text-xl font-bold text-default-500">
                    Please check your email to activate your account.
                </p>

                <Button className="mt-4 w-fit" variant="bordered" color="primary" onClick={() => router.push("/")}>Back to Homepage</Button>
            </div>
        </div>
    )
}

export default RegisterSuccess;