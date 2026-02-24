
export interface ApiResponse {
    message?: string;
    data?: {
        query: Query;
    };
    // query?: Query;
}

export interface Query {
    searchinfo: Searchinfo;
    search: Article[];
}

export interface Searchinfo {
    totalhits: number;
}

export interface Article {
    ns: number;
    title: string;
    pageid: number;
    size: number;
    wordcount: number;
    snippet: string;
    timestamp: string;
}