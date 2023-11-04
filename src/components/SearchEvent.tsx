"use client"

import { useRef } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Search } from 'lucide-react';
export default function SearchEvent()
{
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchInputRef = useRef<HTMLInputElement>(null);


    const handleSearch = () => {
        const search = searchInputRef.current?.value;

        const params = new URLSearchParams(searchParams);
        params.set("search", search!);
        router.push(`${pathname}?${params.toString()}`);
        router.refresh();
    };

    return (
    <>
        <div className="flex">
        <input
        type="text"
        className="flex h-10 w-full border border-neutral-1000 
        bg-white mx-2 my-2 px-3 py-2 text-sm ring-offset-white 
        placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed 
        disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
        placeholder="Search events..."
        ref={searchInputRef}
        />
        
        <button className=
            "my-2 mx-2 rounded-full bg-brand px-4 py-2 transition-colors hover:bg-brand/60"
        >
        <Search size={24} className="text-neutral-500 text-white" onClick={handleSearch}/>
        </button>
        </div>
    </>
    )
}