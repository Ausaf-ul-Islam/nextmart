import type React from "react"
import { getBannersData } from "@/lib/getData"
import Container from "./Container"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import FormattedPrice from "./FormattedPrice"
import { BannerData } from "../../types"

const Banner: React.FC = async () => {
  const banners: BannerData[] = await getBannersData()

  // Assuming the first banner is the large one, and the rest are smaller right banners.
  const [singleBanner, ...rightBanners] = banners

  return (
    <Container className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {/* Left Banner (PlayStation Promotion) */}
      <div className="lg:col-span-2 bg-bgLight relative flex flex-col sm:flex-row items-center justify-between rounded-lg overflow-hidden group p-4 sm:p-6 lg:p-8">
        {/* Text Section (50% Width) */}
        <div className="z-10 flex flex-col gap-3 sm:gap-4 lg:gap-5 w-full sm:w-1/2">
          {/* Sale Button (Small) */}
          <button className="bg-lightGreen text-white rounded-full px-3 py-2 text-xs sm:text-sm md:text-base lg:text-md w-1/3 font-semibold transition-all">
            Sale {singleBanner?.price}
          </button>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
            {singleBanner?.title}
          </p>
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
            {singleBanner?.subtitle}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
            {singleBanner?.description}
          </p>
          {/* Shop Now Button (Medium) */}
          <Link
            href="/shop"
            className="inline-block px-6 py-2 text-sm md:text-base lg:text-lg w-1/2 text-center bg-lightOrange text-white font-bold rounded-full shadow-md hover:bg-darkOrange hover:shadow-lg hoverEffect"
          >
            Shop Now
          </Link>
        </div>

        {/* Image Section (50% Width) */}
        <div className="w-full sm:w-1/2 flex justify-center items-center mt-4 sm:mt-0 cursor-pointer">
          <Image
            src={urlFor(singleBanner?.image).url()}
            alt={singleBanner?.title || "Banner"}
            width={500}
            priority
            height={500}
            className="object-contain w-full h-auto max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>


      {/* Right Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-8 h-full">
        {rightBanners.map((banner, index) => (
          <div
            key={index}
            className="flex-1 bg-bgLight p-4 sm:p-5 lg:p-6 rounded-lg relative flex items-center overflow-hidden group hover:shadow-lg transition-shadow"
          >
            {/* Text Content */}
            <div className="z-10 flex flex-col gap-1 sm:gap-2 lg:gap-3 max-w-[60%] sm:max-w-full lg:max-w-[60%]">
              <p className="text-sm lg:text-base font-semibold">{banner?.title}</p>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold">{banner?.subtitle}</h3>
              <p className="text-xs sm:text-sm text-black/60 font-bold">From <FormattedPrice className="text-lightRed font-bold" amount={banner?.price} /> </p>
              <Link
                href="/shop"
                className="mt-2 sm:mt-3 lg:mt-4 font-bold underline underline-offset-2 decoration-[1px] hover:text-lightRed hoverEffect text-sm lg:text-base"
              >
                Shop now!
              </Link>
            </div>
            {/* Image Positioned Above Text */}
            <Image
              src={urlFor(banner?.image).url()}
              alt={banner?.title || `Banner ${index + 1}`}
              width={200}
              priority
              height={200}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 object-contain h-28 sm:h-32 md:h-36 lg:h-40  cursor-pointer group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Banner

