import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/event' },
]

const BUTTON_NAV_ITEMS = [
    { label: "Register", href: "/auth/register", variant: "bordered" },
    { label: "Login", href: "/auth/login", variant: "solid" },
];

const SOCIAL_MEDIA_NAV_ITEMS = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/letdya/",
        icon: <FaInstagram />,
    },
    {
        label: "Twitter",
        href: "https://www.x.com/letneaa/",
        icon: <FaTwitter />,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/radiva/",
        icon: <FaLinkedin />,
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@letdya/",
        icon: <FaYoutube />,
    }
];
export { NAV_ITEMS, BUTTON_NAV_ITEMS, SOCIAL_MEDIA_NAV_ITEMS };