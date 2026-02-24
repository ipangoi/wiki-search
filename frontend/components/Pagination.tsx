import { useState } from "react"

interface Props {
    totalHits: number;
    limit: number;
    offset: number;
    setOffset: (n: number) => void;
}

export default function Pagination({ totalHits, limit, offset, setOffset }: Props) {

    const totalPages = Math.ceil(totalHits/limit);
    const currentPages = Math.floor(offset/limit) + 1;

    const getPageNumber = () => {
        const totalButton = 5;

        let startPage = Math.max(1, currentPages - 2);
        let endPage = Math.min(totalPages, startPage + totalButton - 1);

        if (endPage - startPage + 1 < totalButton) {
            startPage = Math.max(1, endPage - totalButton + 1)
        }

        const pages = []
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }

    const handlePageChange = (page: number) => {
        const newOffset = (page - 1) * limit;
        setOffset(newOffset);
        window.scrollTo({top: 0, behavior:'smooth'})
    }

    const handleFirst = () => setOffset(0);
    const handleLast = () => setOffset((totalPages - 1) * limit);
    const handlePrev = () => setOffset(Math.max(0, offset - limit));
    const handleNext = () => setOffset(Math.min((totalPages - 1) * limit, offset + limit));


    return (
        <>
            <nav>
                <ul className="flex -space-x-px text-sm">
                    <li>
                        <button onClick={handleFirst} disabled={currentPages === 1} className={`flex items-center justify-center text-body box-border border text-sm w-9 h-9 font-medium focus:outline-none ${currentPages === 1 ? "opacity-50" : "dark:hover:text-black dark:hover:bg-amber-50 hover:bg-gray-900 hover:text-amber-50 cursor-pointer" }`}>
                            <span className="p-8">First</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={handlePrev} disabled={currentPages === 1} className={`flex items-center justify-center text-body box-border border text-sm w-9 h-9 font-medium focus:outline-none ${currentPages === 1 ? "opacity-50" : "dark:hover:text-black dark:hover:bg-amber-50 hover:bg-gray-900 hover:text-amber-50 cursor-pointer" }`}>
                            <span className="sr-only">Previous</span>
                            <svg className="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/></svg>
                        </button>
                    </li>
                    {getPageNumber().map((page) => (
                        <li key={page}>
                            <button disabled={currentPages === page} onClick={() => handlePageChange(page)} className={`flex items-center justify-center text-body box-border border text-sm w-9 h-9 font-medium focus:outline-none ${currentPages === page ? "bg-amber-100 text-gray-900 dark:bg-gray-600 dark:text-amber-50" : "dark:hover:text-black dark:hover:bg-amber-50 hover:bg-gray-900 hover:text-amber-50 cursor-pointer" }`}>
                                
                                {page}
                            </button>
                        </li>
                    ))}
                    
                    <li>
                        <button onClick={handleNext} disabled={currentPages === totalPages} className={`flex items-center justify-center text-body box-border border text-sm w-9 h-9 font-medium focus:outline-none ${currentPages === totalPages ? " opacity-50" : "dark:hover:text-black dark:hover:bg-amber-50 hover:bg-gray-900 hover:text-amber-50 cursor-pointer" }`}>
                            <span className="sr-only">Next</span>
                            <svg className="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/></svg>
                        </button>
                    </li>
                    <li>
                        <button onClick={handleLast} disabled={currentPages === totalPages} className={`flex items-center justify-center text-body box-border border text-sm w-9 h-9 font-medium focus:outline-none ${currentPages === totalPages ? " opacity-50" : "dark:hover:text-black dark:hover:bg-amber-50 hover:bg-gray-900 hover:text-amber-50 cursor-pointer" }`}>
                            <span>Last</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}