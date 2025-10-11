import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/navbar";
import Image from "next/image";
import Link from "next/link";
import { BUTTON_NAV_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { Input } from "@heroui/input";
import { CiSearch } from "react-icons/ci";
import { Button, ButtonProps } from "@heroui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Listbox, ListboxItem, Spinner } from "@heroui/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment } from "react";
import { IEvent } from "@/types/Event";

const LandingPageLayoutNavbar = () => {
    const router = useRouter();
    const session = useSession();
    const {
        profileData,
        dataEventsSearch,
        isLoadingEventsSearch,
        isRefetchingEventsSearch,
        handleSearch,
        search,
        setSearch
    } = useLandingPageLayoutNavbar();

    return (
        <Navbar maxWidth="2xl" isBordered isBlurred={false} shouldHideOnScroll>
            <div className="flex items-center gap-8">
                <NavbarBrand>
                    <Link href="/">
                        <Image src="/images/general/logo.svg" alt="logo" width={150} height={50} className="cursor-pointer" />
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden lg:flex" justify="center">
                    {NAV_ITEMS.map((item) => (
                        <NavbarItem key={`nav-${item.label}`}
                            className={cn(
                                "font-medium text-default-700 hover:text-primary",
                                {
                                    "font-bold text-primary-500": router.pathname === item.href,
                                }
                            )}>
                            <Link href={item.href} >{item.label}</Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>
            </div>
            <NavbarContent justify="end">
                <NavbarMenuToggle className="lg:hidden" />
                <NavbarItem className="hidden lg:flex lg:relative">
                    <Input
                        isClearable
                        className="w-[300px]"
                        placeholder="Search Event"
                        startContent={<CiSearch />}
                        onClear={() => setSearch("")}
                        onChange={handleSearch} />
                    {search !== "" && (
                        <Listbox
                            items={dataEventsSearch?.data || []}
                            className="absolute right-0 top-12 rounded-xl border bg-white">
                            {isRefetchingEventsSearch && !isLoadingEventsSearch ? (
                                (item: IEvent) => (
                                    <ListboxItem key={item._id} href={`/event/${item.slug}`} className="flex items-center gap-2">
                                        <Image src={`${item.banner}`} alt={`${item.name}`} className="w-2/5 rounded-md" width={100} height={40} />
                                        <p className="line-clamp-2 w-3/5 text-wrap">
                                            {item.name}
                                        </p>
                                    </ListboxItem>
                                )
                            ) : (
                                <ListboxItem key="loading">
                                    <Spinner color="primary" size="sm" />
                                </ListboxItem>
                            )}
                        </Listbox>
                    )}
                </NavbarItem>
                {session.status === "authenticated" ? (
                    <NavbarItem className="hidden lg:block">
                        <Dropdown>
                            <DropdownTrigger>
                                <Avatar
                                    src={profileData?.profilePicture}
                                    className="cursor-pointer"
                                    showFallback />
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="admin"
                                    href="/admin/event"
                                    className={cn({
                                        hidden: profileData?.role !== "admin"
                                    })}
                                >
                                    Admin
                                </DropdownItem>
                                <DropdownItem
                                    key="profile"
                                    href="/member/profile"
                                >
                                    Profile
                                </DropdownItem>
                                <DropdownItem
                                    key="signout"
                                    onPress={() => signOut()}
                                >
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                ) : (
                    <div className="hidden lg:flex lg:gap-4">
                        {BUTTON_NAV_ITEMS.map((item) => (
                            <NavbarItem key={`btn-${item.label}`}>
                                <Button
                                    color="primary"
                                    variant={item.variant as ButtonProps["variant"]} >
                                    <Link href={item.href} >{item.label}</Link>
                                </Button>
                            </NavbarItem>
                        ))}
                    </div>
                )}
                <NavbarMenu className="gap-4">
                    {NAV_ITEMS.map((item) => (
                        <NavbarMenuItem
                            key={`nav-${item.label}`}
                        >
                            <Link href={item.href} className={
                                cn(
                                    "font-medium text-default-700 hover:text-primary",
                                    { "font-bold text-primary": router.pathname === item.href }
                                )
                            }>{item.label}</Link>
                        </NavbarMenuItem>
                    ))}
                    {session.status === "authenticated" ? (
                        <Fragment>
                            <NavbarMenuItem
                                className={
                                    cn(
                                        { "hidden": profileData?.role !== "admin" }
                                    )
                                }>
                                <Link href="/admin/event" className="font-medium text-default-700 hover:text-primary">Admin</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Link href="/member/profile" className="font-medium text-default-700 hover:text-primary">Profile</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Button color="danger"
                                    onPress={() => signOut()}
                                    className="mt-2 w-full"
                                    variant="bordered"
                                    size="md">
                                    Log Out
                                </Button>
                            </NavbarMenuItem>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {BUTTON_NAV_ITEMS.map((item) => (
                                <NavbarMenuItem key={`btn-${item.label}`}>
                                    <Button
                                        color="primary"
                                        fullWidth
                                        variant={item.variant as ButtonProps["variant"]}
                                        size="md"
                                    >
                                        <Link href={item.href} >{item.label}</Link>
                                    </Button>
                                </NavbarMenuItem>
                            ))}
                        </Fragment>
                    )}
                </NavbarMenu>
            </NavbarContent>
        </Navbar >
    )
}

export default LandingPageLayoutNavbar;