"use client"

import React, { useState, useEffect } from "react"
import { CiSearch } from "react-icons/ci"
import { IoMdClose } from "react-icons/io"

// Sample product data
const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Smartphone" },
    { id: 3, name: "Headphones" },
    { id: 4, name: "Tablet" },
    { id: 5, name: "Smartwatch" },
]

const SearchInput = () => {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState(products)

    useEffect(() => {
        const debounce = setTimeout(() => {
            const filteredProducts = products.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            )
            setSearchResults(filteredProducts)
        }, 300)

        return () => clearTimeout(debounce)
    }, [search])

    return (
        <div className="w-full relative flex flex-col items-center">
            <div className="w-full max-w-lg  relative">
                <div className="flex items-center border border-gray-300  shadow-sm bg-white h-12 px-3">
                    <CiSearch className="text-xl text-gray-500" aria-hidden="true" />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="flex-1 h-full pl-3 text-sm text-gray-700 outline-none bg-transparent"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        aria-label="Search input"
                    />
                    {search && (
                        <IoMdClose
                            onClick={() => setSearch("")}
                            className="text-gray-500 hover:text-red-500 cursor-pointer"
                            aria-label="Clear search"
                        />
                    )}
                    <button
                        className="ml-3 bg-orange-500 text-white px-4 py-2  text-sm hover:bg-orange-600 transition"
                        aria-label="Search button"
                    >
                        Search
                    </button>
                </div>
                {search && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200  shadow-md max-h-60 overflow-y-auto z-50">
                        {searchResults.length > 0 ? (
                            searchResults.map((product) => (
                                <div
                                    key={product.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <p className="text-gray-800 font-medium">{product.name}</p>
                                </div>
                            ))
                        ) : (
                            <p className="px-4 py-2 text-gray-500">No results found</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchInput
