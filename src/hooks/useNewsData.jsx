import { useState, useEffect } from "react";
import Papa from "papaparse";

const SHEET_URL = import.meta.env.VITE_NEWS_SHEET_URL;
const CACHE_KEY = "live_news_cache_v2"; // Bumped version to clear old cache automatically

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
    if (!SHEET_URL) return;

    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("RAW CSV ROWS FROM GOOGLE SHEET:", results.data);

        const formatted = results.data
          .filter((row) => {
            // Case-insensitive key lookup helper for filtering
            const getVal = (key) => {
              const foundKey = Object.keys(row).find(
                (k) => k.trim().toLowerCase() === key.toLowerCase()
              );
              return foundKey ? row[foundKey] : "";
            };

            const slug = getVal("slug");
            const title = getVal("title");
            const status = getVal("status") || "published";

            return (
              slug?.trim() &&
              title?.trim() &&
              status.trim().toLowerCase() === "published"
            );
          })
          .map((row) => {
            // Helper to find keys regardless of casing or extra spaces in Google Sheets headers
            const getField = (key) => {
              const foundKey = Object.keys(row).find(
                (k) => k.trim().toLowerCase() === key.toLowerCase()
              );
              return foundKey ? row[foundKey] : "";
            };

            const title = getField("title").trim();
            const content = getField("content").trim();

            if (!content) {
              console.warn(`[useNewsData] Warning: Article "${title}" has empty content! Check Column H header name.`);
            }

            return {
              id: Number(getField("id")) || 0,
              slug: getField("slug").trim(),
              title: title,
              metaTitle: (getField("metaTitle") || title).trim(),
              metaDescription: (getField("metaDescription") || title).trim(),
              date: getField("date").trim(),
              image: getField("image").trim(),
              content: content,
            };
          })
          .sort((a, b) => b.id - a.id);

        setNews(formatted);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
        setLoading(false);
      },
      error: (err) => {
        console.error("Error fetching Google Sheet:", err);
        setError("Failed to load news articles.");
        setLoading(false);
      },
    });
  }, []);

  return { news, loading, error };
}