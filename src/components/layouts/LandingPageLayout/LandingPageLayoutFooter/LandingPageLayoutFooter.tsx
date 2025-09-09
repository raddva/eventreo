import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, SOCIAL_MEDIA_NAV_ITEMS } from "../LandingPageLayout.constants";

const LandingPageLayoutFooter = () => {
    return (
        <div className="flex flex-col items-center justify-between px-6 py-10 text-center lg:flex-row lg:text-left xl:p-20 bg-blue-950">
            <Image
                src={"/images/general/logo.svg"}
                alt="Eventreo"
                width={200}
                height={50}
                className="mb-4 lg:mb-0 lg:w-60"
            />
            <div className="mb-4 flex flex-col gap-4 lg:mb-0">
                <div>
                    <h4 className="text-xl text-white">Customer Service</h4>
                    <p className="text-gray-600">
                        <Link href="mailto:raddvana@gmail.com">raddvana@gmail.com</Link> | {" "}
                        <Link href="tel:+6285119967373">+62 851-1996-7373</Link>
                    </p>
                </div>
                <div>
                    <h4 className="text-xl text-white">Office</h4>
                    <p className="text-gray-600">
                        Jl. Memasak Apa Hari ini Shef No. 24, Bandung, Indonesia
                    </p>
                </div>
            </div>
            <div className="mb-10 lg:mb-0 flex flex-col gap-2">
                <h2 className="text-xl text-white lg:mb-2">Menu</h2>
                {NAV_ITEMS.map((item) => (
                    <Link key={`footer-nav-${item.label}`} href={item.href}
                        className="cursor-pointer text-gray-600 hover:text-white">
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="flex flex-col items-center gap-8">
                <div className="flex items-center justify-between gap-8 text-gray-600">
                    {SOCIAL_MEDIA_NAV_ITEMS.map((item) => (
                        <Link href={item.href}
                            className="text-3xl hover:text-white"
                            key={`footer-social-${item.label}`}>
                            {item.icon}
                        </Link>
                    ))}
                </div>
                <p className="w-full text-center text-gray-600">Copyright © 2025 Eventreo. All rights reserved.</p>
            </div>
        </div>
    );
}

export default LandingPageLayoutFooter;