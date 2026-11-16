import { useState, useEffect } from "react";
import Papa from "papaparse";

const SHEET_URL = import.meta.env.VITE_NEWS_SHEET_URL;
const CACHE_KEY = "live_news_cache_v3"; // Bumped version to clear old empty cache

export function useNewsData() {
  const [news, setNews] = useState(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(
    () => Boolean(SHEET_URL) && !sessionStorage.getItem(CACHE_KEY)
  );
  const [error, setError] = useState(() =>
    SHEET_URL ? null : "Missing VITE_NEWS_SHEET_URL in .env file"
  );

  useEffect(() => {
    if (!SHEET_URL) {
      console.error("[useNewsData] VITE_NEWS_SHEET_URL is missing or undefined!");
      return;
    }

    console.log("[useNewsData] Fetching sheet from:", SHEET_URL);

    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("[useNewsData] Raw parsed PapaParse results:", results);

        if (!results.data || results.data.length === 0) {
          console.warn("[useNewsData] Warning: Parsed data array is empty!");
          setLoading(false);
          return;
        }

        const formatted = results.data
          .filter((row) => {
            const getVal = (key) => {
              const foundKey = Object.keys(row).find(
                (k) => k.trim().toLowerCase() === key.toLowerCase()
              );
              return foundKey ? row[foundKey] : "";
            };

            const slug = getVal("slug");
            const title = getVal("title");

            // Basic check to ensure row has required fields
            return slug?.trim() && title?.trim();
          })
          .map((row) => {
            const getField = (key) => {
              const foundKey = Object.keys(row).find(
                (k) => k.trim().toLowerCase() === key.toLowerCase()
              );
              return foundKey ? row[foundKey] : "";
            };

            const title = getField("title").trim();
            const content = getField("content").trim();

            if (!content) {
              console.warn(`[useNewsData] Warning: Article "${title}" has empty content!`);
            }

            return {
              id: Number(getField("id")) || 0,
              slug: getField("slug").trim(),
              title: title,
              metaTitle: (getField("metaTitle") || title).trim(),
              metaDescription: (getField("metaDescription") || title).trim(),
              date: getField("date").trim(),
              image: (getField("image") || "").trim(),
              content: content,
            };
          })
          .sort((a, b) => b.id - a.id);

        console.log("[useNewsData] Successfully formatted articles:", formatted);
        setNews(formatted);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
        setLoading(false);
      },
      error: (err) => {
        console.error("[useNewsData] PapaParse error fetching Google Sheet:", err);
        setError("Failed to load news articles.");
        setLoading(false);
      },
    });
  }, []);

  return { news, loading, error };
}