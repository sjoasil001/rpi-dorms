// src/components/SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { query, category };
    if (onSearch) onSearch(payload);
    else console.log("Search:", payload);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full max-w-5xl mx-auto
        bg-white/85 backdrop-blur-md
        border border-zinc-200 shadow-xl
        rounded-full px-3 py-2 md:px-4 md:py-3
        flex flex-col md:flex-row items-stretch gap-2 md:gap-0
      "
    >
      {/* Query */}
      <label className="sr-only" htmlFor="query">What are you looking for?</label>
      <div className="flex items-center gap-3 md:flex-[1_1_60%] px-4">
        <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0 opacity-60">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5L21.5 20zM9.5 14A4.5 4.5 0 1 1 14 9.5A4.5 4.5 0 0 1 9.5 14"/>
        </svg>
        <input
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find dorm related quesions..."
          className="w-full bg-transparent outline-none placeholder-zinc-400"
        />
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-zinc-200" />

      {/* Category */}
      <div className="flex items-center gap-3 md:flex-[1_1_40%] px-4">
        <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0 opacity-60">
          <path fill="currentColor" d="M3 5h18v2H3zm4 6h14v2H7zm-4 6h18v2H3z"/>
        </svg>
        <label className="sr-only" htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-transparent outline-none text-zinc-700"
        >
          <option value="">All Categories</option>
          <option value="dorms">Dorms</option>
          <option value="amenities">Amenities</option>
          <option value="dining">Dining</option>
          <option value="study">Study Spaces</option>
        </select>
      </div>

      {/* Search button */}
      <div className="md:ml-auto px-2 md:px-3 py-1 md:py-0">
        <button
          type="submit"
          className="w-full md:w-auto rounded-full bg-[#c8102e] hover:bg-[#a90d26] text-white font-semibold px-6 py-3 flex items-center justify-center gap-2 transition"
        >
          Search
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="m10 17l5-5l-5-5v10z"/>
          </svg>
        </button>
      </div>
    </form>
  );
}
