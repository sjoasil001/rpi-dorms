// src/pages/Insights.jsx
import React from "react";
import SearchBar from "../components/SearchBar";

export default function Insights() {
  return (
    <div className="pt-40 px-6 md:px-40 font-sans bg-white text-center">
      <h1 className="text-[#c8102e] mb-6 font-extrabold" style={{ fontSize: "100px", lineHeight: 1 }}>
        RPI Says
      </h1>

      <SearchBar onSearch={(p) => console.log("Search:", p)} />
      <p className="mt-4 text-zinc-600 text-sm md:text-base">
        Powered by your experiences — here’s what students on campus are saying.
      </p>

     
    </div>
  );
}
