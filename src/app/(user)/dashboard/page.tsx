import Container from "@/components/Container";
import Headings from "@/components/Headings";
import SignOut from "@/components/SignOut";
import { getSession, validateSession } from "@/lib/manageSession";
import Image from "next/image";
import { redirect } from "next/navigation"; // Import for redirecting if not logged in

const DashboardPage = async () => {
    // Validate session to check if the user is authenticated
    await validateSession();
    const session = await getSession();

    // If there's no session or the session is invalid, redirect to login page
    if (!session || !session.user) {
        redirect("/login"); // You can specify your login route here
    }

    return (
        <Container className="py-10">
            <Headings title="Welcome to" subtitle="Our Dashboard" />

            {/* Display user data only if the user is logged in and session is valid */}
            {session?.user?.name && session?.user?.email ? (
                <div className="flex items-center gap-3 my-5">
                    <Image
                        src={session?.user?.image as string}
                        alt="userImage"
                        width={200}
                        height={200}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="text-base font-semibold">{session?.user?.name}</p>
                        <p className="text-sm font-medium">{session?.user?.email}</p>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-lg font-semibold">User is not logged in via credentials.</p>
                </div>
            )}

            <SignOut />
        </Container>
    );
};

export default DashboardPage;
