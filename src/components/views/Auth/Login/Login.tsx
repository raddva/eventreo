import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useLogin from "./useLogin";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@heroui/button";
import { Controller } from "react-hook-form";
import { Spinner } from "@heroui/spinner";
import { cn } from "@/utils/cn";

const Login = () => {
    const { isVisible, toggleVisibility, control, errors, handleLogin, handleSubmit, isPendingLogin } = useLogin();

    return (
        <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
            <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10">
                <Image
                    src="/images/general/logo.svg"
                    alt="Eventreo Logo"
                    width={270}
                    height={270}
                />
                <Image
                    src="/images/illustrations/auth.svg"
                    alt="Auth"
                    className="w-2/3 lg:w-full"
                    width={512}
                    height={512}
                />
            </div>
            <Card>
                <CardBody className="p-8">
                    <h2 className="text-2xl font-bold text-primary-400">Sign In</h2>
                    <p className="mb-4 mt-2 text-small">Doesn&apos;t have any Account?&nbsp;
                        <Link href="/auth/register" className="font-semibold text-primary-300">Register</Link>
                    </p>
                    {errors.root && <p className="mb-2 font-medium text-danger"> {errors?.root?.message}</p>}
                    <form className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} onSubmit={handleSubmit(handleLogin)}>
                        <Controller name="identifier" control={control} render={({ field }) => (
                            <Input {...field} type="text" label="Email / Username" variant="bordered" autoComplete="off" isInvalid={errors.identifier !== undefined} errorMessage={errors.identifier?.message} />
                        )} />
                        <Controller name="password" control={control} render={({ field }) => (
                            <Input {...field} type={isVisible ? 'text' : 'password'} label="Password" variant="bordered" autoComplete="off"
                                endContent={
                                    <button
                                        aria-label="toggle password visibility"
                                        className="focus:outline-none outline-transparent"
                                        type="button"
                                        onClick={toggleVisibility}
                                    >
                                        {
                                            isVisible ?
                                                (<FaRegEye className="text-xl text-default-400 pointer-events-none" />) :
                                                (<FaRegEyeSlash className="text-xl text-default-400 pointer-events-none" />)
                                        }
                                    </button>
                                }
                                isInvalid={errors.password !== undefined}
                                errorMessage={errors.password?.message}
                            />
                        )} />
                        <Button color="primary" size="lg" type="submit">
                            {isPendingLogin ? <Spinner color="white" variant="wave" /> : "Login"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
