"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import DatePickerInit from "./DatePickerInit";
import LocationSearchMultiSelect from "./LocationSearchMultiSelect";

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSlugPage = /^\/classified-jobs\/[^\/]+$/.test(pathname);
  const isListingPage = pathname === "/classified-jobs";
  const showHeader = !isSlugPage;
  const showFilters = isListingPage;

  const initialQuery = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(initialQuery);

  const handleClear = () => {
    setSearch("");
    // Remove 'q' from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {showHeader && (
        <>
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">
            Classified Jobs
          </h1>
          <p className="text-center text-gray-600 italic">
            “Find the jobs you desire”
          </p>

          {showFilters && (
            <div className="flex justify-center mt-6 mb-8">
              <form method="GET" className="flex w-full max-w-xl relative">
                <input
                  type="text"
                  name="q"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search job title, keyword, or role..."
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full shadow-sm text-sm text-gray-700 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                {/* 🔍 Icon */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  🔍
                </div>

                {/* ❌ Clear Icon */}
                {search && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-lg focus:outline-none"
                    aria-label="Clear search"
                  >
                    &times;
                  </button>
                )}

                {/* Hidden submit to allow enter key to still work */}
                <button type="submit" hidden />
              </form>
            </div>
          )}
        </>
      )}

      <div className="flex gap-8">
        <aside className="w-64 border-r pr-6 text-sm space-y-6">
          {showFilters && (
            <form method="GET" className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold">Filters:</h2>
                <a
                  href="/classified-jobs"
                  className="text-xs text-red-600 underline hover:text-red-800 transition"
                >
                  Clear All
                </a>
              </div>

              {/* Date Filter */}
              <div>
                <p className="font-medium mb-2">Date Posted:</p>
                <input
                  type="text"
                  id="date-range"
                  className="w-full border rounded px-2 py-1 text-sm"
                  placeholder="Select range"
                  readOnly
                />
                <input type="hidden" name="start" id="start-date" />
                <input type="hidden" name="end" id="end-date" />
              </div>

              {/* Location Filter */}
              <LocationSearchMultiSelect />

              {/* Experience Filter */}
              <div>
                <p className="font-medium mb-2">Experience Required:</p>
                <select
                  name="experience"
                  className="w-full border px-2 py-1 rounded text-sm"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white text-xs rounded px-3 py-2 mt-2"
              >
                Apply Filter
              </button>
            </form>
          )}

          {/* ✅ Ad Box Always Visible */}
          <div className="border p-3 text-xs text-gray-700 rounded">
            <p>Want your job ad here?</p>
            <p className="mt-2">
              Contact:{" "}
              <a
                href="https://wa.me/923223379647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                +92 322 337 9647
              </a>
            </p>
            <p>
              Follow our <a className="underline">terms and conditions</a>.
            </p>
            <p className="mt-2">Note: Do not send us your resume.</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>

      {showFilters && <DatePickerInit />}
    </div>
  );
}
