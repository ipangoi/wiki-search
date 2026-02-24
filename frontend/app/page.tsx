'use client'

import Image from "next/image";
import "./globals.css";
import { useState, useEffect } from "react";

import { fetchAPI } from "@/lib/api";
import { ApiResponse, Article } from "@/types";

import SearchResultList from "@/components/SearchResultList";
import SearchBar from "@/components/Search";
import Pagination from "@/components/Pagination";



export default function Home() {
  const [queryText, setQueryText] = useState("")
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState<number>(0);
  const [totalHits, setTotalHits] = useState(0)
  const LIMIT = 10;

  
  useEffect(() => {
    if (queryText) {
      fetchData()
    }
  },[queryText, offset])
  
  const fetchData = async () => {
    setLoading(true);
    setError("");

    
    try {
      // Panggil API disini ya nggak di Search boy
      const data = await fetchAPI<ApiResponse>(queryText, offset);
      
      if (data.data?.query?.search) {
        const results = data.data.query.search;
        setArticles(results);
        setTotalHits(data.data.query.searchinfo.totalhits);
        if (data.data.query.search.length > 0) {
          setEmpty(false);
        } else {
          setEmpty(true);
          setTimeout(() => {
            setEmpty(false)
          }, 2000)
        }
        
      } else {
        setArticles([]);
      }
      
    } catch (err) {
      setError("Gagal mengambil data. Coba lagi nanti.");
      console.error(err);
    } finally {
      setLoading(false);
    }

  }

  const handleSearch = async (queryNew: string) => {

    setEmpty(false);
    setQueryText(queryNew);

    setOffset(0);
    
  };

  

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center align-middle gap-4 py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div className="flex w-full flex-col gap-4 items-center">
            <div className="text-title">
              <h1 className="font-bold text-black dark:text-white md:text-2xl">Wikipedia</h1>
              <h1 className="font-bold text-black dark:text-white md:text-2xl">Search Engine</h1>
            </div>
            <div className="w-full">
              <SearchBar onSearch={handleSearch} loading={loading} />
            </div>
            {/* {loading && <p className="text-center text-amber-100 text-2xl md:text-4xl md:mt-4">Loading...</p>} */}
            {error && <p className="text-center text-red-500">{error}</p>}
            {empty && <p className="text-center text-amber-100 text-2xl md:text-4xl md:mt-4">Tidak Ditemukan Hasil</p>}
            {loading ? (
              <div className="w-full flex flex-col gap-8 mt-6">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-full animate-pulse flex flex-col gap-2">
                    <div className="h-6 bg-zinc-300 dark:bg-zinc-800 rounded-md w-3/4 md:w-1/2"></div>
                    <div className="flex flex-col gap-1.5 mt-1">
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-900 rounded-md w-full"></div>
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-900 rounded-md w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !empty && articles.length > 0 && (
                <div className="w-full mt-6">
                  <SearchResultList results={articles} />
                </div>
              )
            )}
            {totalHits > 0 && <Pagination totalHits={totalHits} limit={LIMIT} offset={offset} setOffset={setOffset} />}
          </div>
        </main>
        
      </div>
      
    </>
  );
}
