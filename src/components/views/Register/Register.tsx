import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useRegister from "./useRegister";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@heroui/button";

const Register = () => {
    const { visiblePassword, handleVisiblePassword } = useRegister();
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
                    <h2 className="text-xl font-bold text-primary-400">Create Account</h2>
                    <p className="mb-4 text-small">Already have any Account?&nbsp;
                        <Link href="/login" className="font-semibold text-primary-300">Login</Link>
                    </p>
                    <form action="" className="flex w-80 flex-col gap-4">
                        <Input type="text" label="Fullname" variant="bordered" autoComplete="off" />
                        <Input type="text" label="Username" variant="bordered" autoComplete="off" />
                        <Input type="email" label="E-mail" variant="bordered" autoComplete="off" />
                        <Input type={visiblePassword.password ? 'text' : 'password'} label="Password" variant="bordered" autoComplete="off"
                            endContent={
                                <button
                                    aria-label="toggle password visibility"
                                    className="focus:outline-none outline-transparent"
                                    type="button"
                                    onClick={() => handleVisiblePassword("password")}
                                >
                                    {
                                        visiblePassword.password ?
                                            (<FaRegEye className="text-xl text-default-400 pointer-events-none" />) :
                                            (<FaRegEyeSlash className="text-xl text-default-400 pointer-events-none" />)
                                    }
                                </button>
                            } />
                        <Input type={visiblePassword.passwordConfirmation ? 'text' : 'password'} label="Password Confirmation" variant="bordered" autoComplete="off"
                            endContent={
                                <button
                                    aria-label="toggle password visibility"
                                    className="focus:outline-none outline-transparent"
                                    type="button"
                                    onClick={() => handleVisiblePassword("passwordConfirmation")}
                                >
                                    {
                                        visiblePassword.passwordConfirmation ?
                                            (<FaRegEye className="text-xl text-default-400 pointer-events-none" />) :
                                            (<FaRegEyeSlash className="text-xl text-default-400 pointer-events-none" />)
                                    }
                                </button>
                            } />
                        <Button color="primary" size="lg" type="submit">
                            Register
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Register;
