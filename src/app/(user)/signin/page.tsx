import { signIn } from "@/auth";
import Container from "@/components/Container";
import { SignInForm } from "@/components/SignInForm";
import googleImage from "@/assets/googleImage.png";
import githubImage from "@/assets/githubImage.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/manageSession";

const SignInPage = async () => {
    const session = await getSession();

    if (session?.user) {
        redirect("/profile");
    }
    return (
        <Container className="py-20 flex flex-col items-center justify-center">
            <div className="w-[500px] bg-bgLight p-10 rounded-lg shadow-sm shadow-darkOr/50">
                <SignInForm />
                <div className="mb-5 mt-6">
                    <h2 className="text-xl text-center font-bold">Continue with</h2>
                    <div className="flex justify-center items-center gap-3 mt-2">
                        <form
                            action={async () => {
                                "use server";
                                await signIn("google", { redirectTo: "/" });
                            }}
                            className="flex items-center gap-1 border border-accent font-semibold bg-slate-50 px-2 py-1.5 rounded-md hover:bg-slate-200 hover:text-white duration-300 ease-in-out"
                        >
                            <Image src={googleImage} alt="googleImage" className="w-8" />
                            <button type="submit"> Google</button>
                        </form>
                        <form
                            action={async () => {
                                "use server";
                                await signIn("github", { redirectTo: "/" });
                            }}
                            className="flex items-center gap-1 border border-accent font-semibold bg-slate-50 px-2 py-1.5 rounded-md hover:bg-slate-200 duration-300 ease-in-out"
                        >
                            <Image src={githubImage} alt="githubImage" className="w-8" />
                            <button type="submit">Github</button>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SignInPage;