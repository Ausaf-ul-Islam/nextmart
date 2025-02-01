"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { HiMenuAlt2, HiX } from "react-icons/hi"
import SearchInput from "./SearchInput"
import Logo from "./Logo"
import { navBarList } from "@/constants"
import { usePathname } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase" // Firebase auth instance
import { User } from "next-auth"

const Header = () => {
    const currentPath = usePathname() // Get the current pathname

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const [user, setUser] = useState<User | null>(null)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const isActive = (href: string) => {
        return currentPath === href ? 'text-darkOrange font-semibold' : 'text-base font-semibold hover:text-darkOrange duration-300'
    }

    const NavItems = () => (
        <>
            {navBarList.map((item) => (
                <Link
                    href={item?.link}
                    key={item?.link}
                    className={`${isActive(item?.link)}`}
                >
                    {item?.title}
                </Link>
            ))}
            {user ? (
                <>
                    <Link
                        href="/dashboard"
                        className={`${isActive('/dashboard')}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/orders"
                        className={`${isActive('/orders')}`}
                    >
                        Orders
                    </Link>
                </>
            ) : (
                <Link
                    href="/signin"
                    className={`${isActive('/signin')}`}
                >
                    Sign in
                </Link>
            )}
            {user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                <Link
                    href="/studio"
                    className={`${isActive('/studio')}`}
                >
                    Studio
                </Link>
            )}
        </>
    )

    useEffect(() => {
        // Set up Firebase Auth state listener
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser) // Set user when logged in
            } else {
                setUser(null) // Clear user when logged out
            }
        })

        // Clean up the listener when component is unmounted
        return () => unsubscribe()
    }, [])

    return (
        <header className="w-full h-auto bg-white/60 border-b-[1px] border-lightText/20 sticky top-0 z-50 backdrop-blur-md">
            <div className="max-w-screen-xl mx-auto px-4 py-4 md:py-0">
                <div className="flex items-center justify-between gap-5 lg:gap-10">
                    <Logo />
                    <div className="hidden md:block flex-grow max-w-md">
                        <SearchInput />
                    </div>
                    <nav className="hidden md:flex items-center gap-7">
                        <NavItems />
                    </nav>
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-gray-600 focus:outline-none"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <HiX className="w-8 h-6" /> : <HiMenuAlt2 className="w-8 h-6" />}
                    </button>
                </div>
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="mb-4">
                            <SearchInput />
                        </div>
                        <nav className="flex flex-col gap-4">
                            <NavItems />
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
