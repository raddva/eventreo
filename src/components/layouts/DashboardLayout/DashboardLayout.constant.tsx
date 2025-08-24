import { HiOutlineBookmark, HiOutlineTag, HiViewGrid } from "react-icons/hi";
import { PiUserCircleGear } from "react-icons/pi";
import { SlWallet } from "react-icons/sl";
import { IoMdList } from "react-icons/io";

const SIDEBAR_MEMBER = [
    {
        key: "dashboard",
        label: "Dashboard",
        href: "/member/dashboard",
        icon: <HiViewGrid />,
    },
    {
        key: "transaction",
        label: "Transaction",
        href: "/member/transaction",
        icon: <SlWallet />,
    },
    {
        key: "setting",
        label: "Setting",
        href: "/member/setting",
        icon: <PiUserCircleGear />,
    }
];

const SIDEBAR_ADMIN = [
    {
        key: "dashboard",
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <HiViewGrid />,
    },
    {
        key: "event",
        label: "Event",
        href: "/admin/event",
        icon: <IoMdList />,
    },
    {
        key: "category",
        label: "Category",
        href: "/admin/category",
        icon: <HiOutlineTag />,
    },
    {
        key: "banner",
        label: "Banner",
        href: "/admin/banner",
        icon: <HiOutlineBookmark />,
    },
    {
        key: "transaction",
        label: "Transaction",
        href: "/admin/transaction",
        icon: <SlWallet />,
    },
    // {
    //     key: "setting",
    //     label: "Setting",
    //     href: "/admin/setting",
    //     icon: <PiUserCircleGear />,
    // }
]

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };