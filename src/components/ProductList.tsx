import React from "react";
import { getProductsData } from "@/lib/getData";
import ProductCard from "./ProductCard";
import { ProductData } from "../../types";
import Headings from "./Headings";

export const revalidate = 0;
interface ProductTopHeadings {
    showHeading?: boolean;
    title?: string;
    subtitle?: string;
}

const ProductList = async ({ showHeading = true }: ProductTopHeadings) => {
    const products: ProductData[] = await getProductsData(); // Fetch product data

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-12">
            {/* Conditionally render the Heading */}
            {showHeading && <Headings title={"Browse"} subtitle={"Our Products"} />}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products?.map((item) => (
                    <ProductCard key={item._id} item={item} /> // Pass the product data as a prop
                ))}
            </div>
        </div>
    );
};

export default ProductList;
