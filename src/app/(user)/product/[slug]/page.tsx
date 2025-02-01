import Container from "@/components/Container";
import { groq } from "next-sanity";
import { ProductData } from "../../../../../types";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import ProductInfo from "@/components/ProductInfo";
import { getBestSellersData } from "@/lib/getData";
import ProductCard from "@/components/ProductCard";
import Headings from "@/components/Headings";


interface Props {
    params: {
        slug: string;
    };
}

const SingleProductPage = async ({ params: { slug } }: Props) => {
    // Fetch product and best sellers data
    const query = groq`*[_type == 'product' && slug.current == $slug][0]{
     ...
      }`;
    const product: ProductData = await client.fetch(query, { slug });
    const bestSellersData: ProductData[] = await getBestSellersData();

    // Handle missing product
    if (!product) {
        return (
            <Container className="my-10 text-center">
                <h1 className="text-2xl font-bold">Product not found</h1>
            </Container>
        );
    }

    return (
        <>
            {/* Product Details Section with bg-bgLight */}
            <Container className="my-10 p-6 rounded-xl bg-bgLight border-b-4 border-lightOrange">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6">
                    {/* Product Image */}
                    <div className="h-full xl:col-span-2">
                        <Image
                            src={urlFor(product?.image).url()}
                            alt={product.title || "Product image"}
                            className="w-full h-full object-contain rounded-lg"
                            width={500}
                            height={500}
                            priority
                        />
                    </div>

                    {/* Product Info */}
                    <div className="w-full md:col-span-2 xl:col-span-3 xl:p-10 flex flex-col gap-6 justify-center">
                        <ProductInfo product={product} />
                    </div>
                </div>
            </Container>

            {/* Best Sellers Section with white background */}
            {bestSellersData?.length > 0 && (
                <Container className="my-10 p-6 rounded-xl bg-white">
                    <Headings title="Best" subtitle="Sellers" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bestSellersData?.map((item) => (
                            <ProductCard item={item} key={item?._id} />
                        ))}
                    </div>
                </Container>
            )}
        </>
    );
};

export default SingleProductPage;
