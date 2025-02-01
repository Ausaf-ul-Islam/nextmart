"use client";

import { twMerge } from "tailwind-merge";
// import SmallLoader from "./SmallLoader";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { addToCart } from "@/redux/shoppersSlice";
import { ProductData } from "../../types";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface Props {
    className?: string;
    item: ProductData;
}

const AddToCartButton = ({ className, item }: Props) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        try {
            setLoading(true);
            dispatch(addToCart(item));
            toast.success(`${item?.title.substring(12, 0)} added successfully!`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={loading}
            className={twMerge(
                "bg-accent text-white w-full py-3 px-6 border border-px border-accent hover:bg-darkOrange hover:border-darkOrange hover:shadow-md focus:outline-none focus:ring-2 focus:ring-darkOrange focus:ring-offset-2 transition-all duration-300 ease-in-out font-semibold tracking-wide flex items-center justify-center gap-2",
                className
            )}
        >
            <AiOutlineShoppingCart size={20} />
            Add to cart
            {/* Add to cart {loading && <SmallLoader />} */}
        </button>
    );
};

export default AddToCartButton;
