'use client'

import { useState } from "react"



export default function SearchBar(props: any) {
    const [searchText, setSearchText] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    async function handleSearch() {
        // try {
        //     const data = await fetchAPI<ApiResponse>(searchText)
        //     setResult(data);
        // } catch (error) {
        //     console.log("Error", error)
        // }
        props.onSearch(searchText)

    }

    return (
        <>
            <div className="relative w-full">

                <div className="relative w-full">
                    <input 
                        type="search" 
                        name="search-box" 
                        id="search-box" 
                        placeholder="Enter Keyword"
                        value={searchText}
                        onChange={handleInputChange}
                        className="w-full rounded-lg bg-gray-900 p-3 pr-26 md:pr-30 text-amber-50 dark:text-black dark:bg-amber-50"
                    />
                    <button 
                        onClick={() => setSearchText("")}
                        hidden={!searchText}
                        className="absolute right-21 md:right-26 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                        <svg className="w-6 h-6 text-white dark:text-gray-800 hover:text-gray-600 dark:hover:text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>

                    </button>
                    <button onClick={handleSearch} className="w-auto absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-blue-600 px-3 py-2 font-semibold text-xs md:text-base text-white hover:bg-blue-700 cursor-pointer">
                        Search
                    </button>
                </div>
            </div>
        </>
    )
}