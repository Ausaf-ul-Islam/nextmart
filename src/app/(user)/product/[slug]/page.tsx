import { groq } from "next-sanity";
import Image from "next/image";
import Container from "@/components/Container";
import ProductInfo from "@/components/ProductInfo";
import ProductCard from "@/components/ProductCard";
import Headings from "@/components/Headings";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getBestSellersData } from "@/lib/getData";
import type { ProductData } from "@/types";

// ✅ Updated PageProps to include both params and searchParams as promises
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SingleProductPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  await searchParams;

  // Sanity query to fetch product data
  const query = groq`*[_type == 'product' && slug.current == $slug][0]{
 ...
  }`;
  const product: ProductData | null = await client.fetch(query, { slug });
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
      {/* Product Details Section */}
      <Container className="my-10 p-6 rounded-xl bg-bgLight border-b-4 border-lightOrange">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6">
          {/* Product Image */}
          <div className="h-full xl:col-span-2">
            <Image
              src={
                product?.image
                  ? urlFor(product.image).url()
                  : "/placeholder.svg"
              }
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

      {/* Best Sellers Section */}
      {bestSellersData?.length > 0 && (
        <Container className="my-10 p-6 rounded-xl bg-white">
          <Headings title="Best" subtitle="Sellers" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bestSellersData.map((item) => (
              <ProductCard item={item} key={item._id} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
