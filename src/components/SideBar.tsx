import { MdSwitchAccount } from "react-icons/md"
import SideBarCartIcon from "./SideBarCartIcon"
import SideBarWhatsappIcon from "./SideBarWhatsappIcon"
import { getSession } from "@/lib/manageSession"
import Image from "next/image"
import Link from "next/link"

const SideBar = async () => {
    const session = await getSession()

    return (
        <div className="fixed right-2 z-20 flex flex-col gap-2 transform -translate-y-1/2 top-1/2">
            <Link
                href={session?.user? "/dashboard" : "/signin"}
                className="bg-accentWhite w-16 h-[70px] sm:w-16 sm:h-[70px] sm:rounded-md flex flex-col gap-1 text-accent justify-center items-center shadow-sm shadow-lightGreen overflow-x-hidden group cursor-pointer"
            >
                <div className="flex justify-center items-center">
                    {session?.user ? (
                        <Image
                            src={(session?.user?.image as string) || "/placeholder.svg"}
                            alt="user image"
                            width={28}
                            height={28}
                            className="rounded-full sm:w-[35px] sm:h-[35px] -translate-x-12 group-hover:translate-x-4 transition-transform duration-200"
                        />
                    ) : (
                        <MdSwitchAccount className="text-xl sm:text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
                    )}

                    {session?.user ? (
                        <Image
                            src={(session?.user?.image as string) || "/placeholder.svg"}
                            alt="user image"
                            width={28}
                            height={28}
                            className="rounded-full sm:w-[35px] sm:h-[35px] -translate-x-4 group-hover:translate-x-12 transition-transform duration-200"
                        />
                    ) : (
                        <MdSwitchAccount className="text-xl sm:text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
                    )}
                </div>
                <p className="text-[10px] sm:text-xs font-semibold">Profile</p>
            </Link>
            <SideBarCartIcon />
            <SideBarWhatsappIcon/>
        </div>
    )
}

export default SideBar

