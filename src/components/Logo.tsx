import Link from "next/link";
import Image from "next/image";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center">
            <Image
                src="/nexMart.png" 
                alt="NexMart Logo"
                width={130} 
                height={100} 
                className="w-24 h-auto sm:w-28 md:w-32 lg:w-36 object-contain hover:scale-110 transition-transform duration-300" // Responsiveness
                priority
            />
        </Link>
    );
};

export default Logo;
