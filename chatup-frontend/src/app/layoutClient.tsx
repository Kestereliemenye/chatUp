"use client"
import { usePathname } from "next/navigation"
import Navbar from "./components/Navbar"
export default function LayoutClirnt({ children }) {
    const pathname = usePathname();

    const showNavbar = pathname !== '/' && pathname !== '/login';
    return (
        <>
            {showNavbar && <Navbar />}
            {children}
        </>
    )

}