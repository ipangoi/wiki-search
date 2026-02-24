import { Article } from "@/types"
import SearchResult from "@/components/SearchResult";

interface Props {
    results: Article[];
}

export default function SearchResultList({results}: Props) {
    if (!results || results.length === 0) {
        return null; 
    }

    return (
        <div className="flex flex-col w-full gap-4 mt-6">
            {results.map((item) => (
                <SearchResult key={item.pageid} article={item} />
            ))}
        </div>
    )
}