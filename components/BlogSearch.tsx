'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Link from 'next/link';

interface BlogSearchResult {
  id: number;
  title: string;
  slug: string;
  published_at?: string | null;
  published_at_readable?: string | null;
}

const SEARCH_API_URL = 'https://admin.hrpostingpartner.com/api/blogs/search';
const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_DELAY = 350;

export default function BlogSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (query.trim().length < MIN_QUERY_LENGTH) {
      setResults([]);
      setIsOpen(false);
      setLoading(false);
      setError(null);
      return;
    }

    debounceTimeoutRef.current = setTimeout(() => {
      searchBlogs(query.trim());
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query]);

  async function searchBlogs(searchTerm: string) {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ q: searchTerm });
      const response = await fetch(`${SEARCH_API_URL}?${params.toString()}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      const payload = Array.isArray(data?.data) ? data.data : [];
      setResults(payload);
      setIsOpen(true);
    } catch (err) {
      if ((err as DOMException).name === 'AbortError') {
        return;
      }
      console.error('Blog search error:', err);
      setError('Unable to load search results. Please try again.');
      setResults([]);
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleFocus() {
    if (results.length > 0 || error) {
      setIsOpen(true);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <label htmlFor="blog-search" className="sr-only">
        Search blogs
      </label>
      <input
        id="blog-search"
        type="search"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder="Search blogs by title, keyword, or topic..."
        className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm text-gray-800 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        autoComplete="off"
      />

      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-blue-500">
          Searching…
        </div>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="max-h-80 overflow-y-auto">
            {error ? (
              <p className="px-5 py-4 text-sm text-red-500">{error}</p>
            ) : results.length === 0 && !loading ? (
              <p className="px-5 py-4 text-sm text-gray-500">
                No blogs found for “{query}”.
              </p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {results.map((result) => (
                  <li key={result.id}>
                    <Link
                      href={`/blogs/${result.slug}`}
                      className="flex flex-col px-5 py-3 text-sm text-gray-800 transition hover:bg-blue-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-medium text-blue-700">
                        {result.title}
                      </span>
                      {(result.published_at_readable ||
                        result.published_at) && (
                        <span className="mt-0.5 text-xs text-gray-500">
                          {result.published_at_readable || result.published_at}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-2 text-right text-xs text-gray-400">
            Showing {results.length} result
            {results.length === 1 ? '' : 's'}
          </div>
        </div>
      )}
    </div>
  );
}
