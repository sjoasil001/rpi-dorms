import React from "react";
import { Link as RouterLink } from "react-router-dom"; 

export default function Footer() {
  const year = new Date().getFullYear();

  const leftLinks = [
    { href: "/", label: "Home" },
    { href: "/dorms", label: "Dorms" },
    { href: "/contact", label: "Contact Us" },
  ];

  const rightLinks = [
    { href: "/insights", label: "Insights" },
    { href: "/map", label: "Map" },
    { href: "/upload", label: "Upload" },
  ];

  const SmartLink = ({ href, children, className }) => {
    const isInternal = href && href.startsWith("/");
    return isInternal ? (
      <RouterLink to={href} className={className}>{children}</RouterLink>
    ) : (
      <a href={href} className={className}>{children}</a>
    );
  };

  return (
    <footer className="relative isolate overflow-hidden bg-[#000000] text-zinc-100">
      {/* Decorative diagonal lines (optional) */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 1440 720"
        preserveAspectRatio="none"
      />

      {/* ↑ Increase default text size across the footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 text-lg md:text-xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* footer statement */}
          <div>
            {/* ↑ Make brand title much larger */}
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl font-semibold tracking-wide">RPI DORMS</span>
            </div>

            {/* ↑ Larger paragraph copy */}
            <p className="mt-6 max-w-md text-zinc-200/80 text-base md:text-lg leading-relaxed">
              Empowering students with real experiences and data-driven tools to
              improve housing selection and outcomes on RPI&apos;s campus.
            </p>

            {/* Back to top — bigger button text */}
            <div className="mt-8">
              <a
                href="#top"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-base md:text-lg font-medium backdrop-blur transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2b21d]/70"
              >
                <span className="grid place-items-center rounded-xl border border-white/20 p-1">
                  <ArrowUp />
                </span>
                BACK TO TOP
              </a>
            </div>
          </div>

          {/* Left links */}
          <nav aria-label="Primary" className="md:pl-16 lg:pl-24">
            {/* ↑ Larger section heading */}
            <h3 className="text-xl md:text-2xl font-semibold">Explore</h3>
            <ul className="mt-3 space-y-3">
              {leftLinks.map((item) => (
                <li key={item.href}>
                  {/* ↑ Larger link text */}
                  <SmartLink
                    href={item.href}
                    className="text-zinc-100/90 hover:text-white underline-offset-4 hover:underline text-lg md:text-xl"
                  >
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right links */}
          <nav aria-label="Tools" className="md:pl-16 lg:pl-24">
            <h3 className="text-xl md:text-2xl font-semibold">Tools</h3>
            <ul className="mt-3 space-y-3">
              {rightLinks.map((item) => (
                <li key={item.href}>
                  <SmartLink
                    href={item.href}
                    className="text-zinc-100/90 hover:text-white underline-offset-4 hover:underline text-lg md:text-xl"
                  >
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom bar — bump text size */}
      <div className="relative bg-[#262424] py-4 text-center text-white">
        <p className="text-base text-medium">
          Copyright © {year}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

function ArrowUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 11l6-6 6 6" stroke="currentColor" strokeWidth="1.8" fill="none" />
    </svg>
  );
}
