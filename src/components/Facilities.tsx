import React from "react";
import { FaWallet } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";
import { GoRocket } from "react-icons/go";
import { PiChats } from "react-icons/pi";
import Headings from "./Headings";

const data = [
  {
    title: "Free Delivery",
    description: "When ordering above $500",
    icon: <GoRocket size={30} className="text-lightOrange" />,
  },
  {
    title: "90 Day's Return",
    description: "Hassle-free returns for 90 days",
    icon: <FaClockRotateLeft size={30} className="text-lightOrange" />,
  },
  {
    title: "Secure Payment",
    description: "100% secure payment",
    icon: <FaWallet size={30} className="text-lightOrange" />,
  },
  {
    title: "24/7 Support",
    description: "Dedicated support at any time",
    icon: <PiChats size={30} className="text-lightOrange" />,
  },
];

const Facilities = () => {
  return (
    <div className="py-10 px-4 sm:px-8 lg:px-16">
      <Headings title="Facilites For" subtitle="Customers"/>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((facility, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-lightOrange"
          >
            {/* Icon with Background */}
            <div className="p-4 bg-lightOrange/10 rounded-full mb-6">
              {facility.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {facility.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600">{facility.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
