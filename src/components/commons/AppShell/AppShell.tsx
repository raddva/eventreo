import { cn } from "@/utils/cn";
import { addToast } from "@heroui/toast";
import { Inter } from "next/font/google";
import { ReactNode, useEffect, useState } from "react";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface PropTypes {
    children: ReactNode;
}

const AppShell = (props: PropTypes) => {
    const { children } = props;
    return (
        <main className={cn(inter.className)}>
            {children}
        </main>
    );
};

export default AppShell;