"use client";

import { useState } from "react";
import { LuAsterisk } from "react-icons/lu";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase";
import Headings from "./Headings";
import Link from "next/link"; // Link import

export const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Sign in with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if email is verified
            if (user.emailVerified) {
                toast.success("Sign-in successful!");
                // Redirect to home page after successful login
                window.location.href = "/"; // Or use react-router for navigation
            } else {
                toast.error("Email not verified. Please check your inbox.");
                await sendEmailVerification(user); // Resend email verification
                toast.success("Verification email sent!");
            }
        } catch (error: unknown) {
            // Handle errors more safely
            if (error instanceof Error) {
                toast.error(error.message || "Failed to sign in. Please try again.");
            } else {
                toast.error("An unknown error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 rounded-lg shadow-md">
            <Headings title={"Sign"} subtitle={"In"} />
            <form onSubmit={handleSignIn} className="space-y-6">
                <div>
                    <Label htmlFor="email">
                        Username or email address <LuAsterisk className="inline text-lightRed text-xs" />
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@youremail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="password">
                        Password <LuAsterisk className="inline text-lightRed text-xs" />
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="ex:#123456$"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit">Sign in</Button>
            </form>

            {/* Register Now link */}
            <div className="text-center mt-4">
                <p className="text-sm">
                    Don&#39;t have an account?{" "}
                    <Link href="/signin" className="text-lightOrange hover:text-darkOrange">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
};

const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-lightText mb-2">
        {children}
    </label>
);

const Input = ({
    id,
    type,
    placeholder,
    value,
    onChange,
    required,
}: {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}) => (
    <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-lightText rounded-md shadow-sm placeholder-lightText focus:outline-none focus:ring-2 focus:ring-lightOrange focus:border-lightOrange"
    />
);

const Button = ({ children, type = "button" }: { children: React.ReactNode; type?: "submit" | "button" }) => (
    <button
        type={type}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-accentWhite bg-lightOrange hover:bg-darkOrange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightRed transition-colors duration-200"
    >
        {children}
    </button>
);

export default SignInForm;
