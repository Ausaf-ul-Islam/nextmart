"use client";
import Link from "next/link";
import React from "react";
import { SiWhatsapp } from "react-icons/si";

const SideBarWhatsappIcon = () => {
    const generateWhatsAppMessage = () => {
        const greeting = "Welcome to NexMart! ";
        const inquiry = "We're happy to have you here!";
        const platformInfo = "Check out our great products and services just for you.";
        const detailsRequest = "If you need more info, feel free to ask.";
        const closing = "We're always here to help!";
        
        const welcomeMessage = `${greeting} ${inquiry} ${platformInfo} ${detailsRequest} ${closing}`;
        
        console.log(welcomeMessage);
        
    
        const message = `${greeting} ${inquiry} ${platformInfo}. ${detailsRequest} ${closing}`;
        
        // Encoding the message to be URL-safe for WhatsApp link
        return encodeURIComponent(message);
    };
        return (
        <Link
            href={`https://wa.me/03459224446?text=${generateWhatsAppMessage()}`}
            target="_blank"
            className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-sm shadow-lightGreen overflow-x-hidden group cursor-pointer relative"
        >
            <div className="flex justify-center items-center ">
                <SiWhatsapp className="text-4xl -translate-x-24 bg-green-500 text-white p-2 rounded-full group-hover:bg-green-600 group-hover:translate-x-3 transition-all duration-200" />
                <SiWhatsapp className="text-4xl -translate-x-5 bg-green-500 text-white p-2 rounded-full group-hover:bg-green-600 group-hover:translate-x-12 transition-all duration-200" />
            </div>
            <p className="text-xs font-semibold">Contact</p>
        </Link>
    );
};

export default SideBarWhatsappIcon;