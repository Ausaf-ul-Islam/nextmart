import React from 'react';

interface HeadingProps {
    title: string; // The main title of the heading
    subtitle?: string; // Optional subtitle (like "Facilities For Customers")
}

const Headings = ({ title, subtitle }: HeadingProps) => {
    return (
        <div>
            {/* Section Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-gray-800 relative">
                {title} <span className="text-lightOrange">{subtitle}</span>
                <span className="block h-1 w-16 bg-lightOrange mx-auto mt-2 rounded"></span>
            </h2>
        </div>
    );
};

export default Headings;
