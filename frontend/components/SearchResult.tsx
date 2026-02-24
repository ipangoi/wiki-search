import { Article } from "@/types"

import './test.css'

interface Props {
    article: Article;
}

export default function SearchResult({article}: Props) {
    const wikiUrl = `https://en.wikipedia.org/?curid=${article.pageid}`;
    return (
        <a href={wikiUrl} className="relative flex flex-col mb-6 max-w-2xl border-b p-4 group overflow-hidden z-0
        before:absolute 
        before:bottom-0 
        before:left-0 
        before:w-full 
        before:h-0.5          
        dark:before:bg-amber-50      
        before:bg-gray-900     
        before:transition-all 
        before:duration-300 
        before:ease-out 
        before:-z-10  
        before: rounded-none
        
        hover:before:h-full
        hover:rounded-t-lg
        data-items
        "
        >
            <div className="font-bold text-black dark:text-amber-50 mb-2 transition-colors dark:group-hover:text-black group-hover:text-amber-50">
                <p className="text-2xl md:text-4xl flex flex-row items-center">
                    {article.title}
                </p>

            </div>
            <div 
                className="text-sm text-black dark:text-amber-50 leading-relaxed transition-colors dark:group-hover:text-black group-hover:text-amber-50"
                dangerouslySetInnerHTML={{ __html: article.snippet }} 
            />
        </a>
    )
}