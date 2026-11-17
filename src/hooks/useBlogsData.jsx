import { useState, useEffect } from "react";
import Papa from "papaparse";

const SHEET_URL = import.meta.env.VITE_BLOGS_SHEET_URL;
const CACHE_KEY = "live_blogs_cache_v1";

export function useBlogsData() {
  const [blogs, setBlogs] = useState(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(
    () => Boolean(SHEET_URL) && !sessionStorage.getItem(CACHE_KEY)
  );
  const [error, setError] = useState(() =>
      SHEET_URL ? null : "Missing VITE_BLOGS_SHEET_URL in .env file"
  );

  useEffect(() => {
    if (!SHEET_URL) return;

    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
          console.log("RAW BLOG CSV ROWS FROM GOOGLE SHEET:", results.data);

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
                console.warn(`[useBlogsData] Warning: Blog "${title}" has empty content! Check the content column header.`);
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

          setBlogs(formatted);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
        setLoading(false);
      },
      error: (err) => {
          console.error("Error fetching blogs from Google Sheet:", err);
          setError("Failed to load blog posts.");
        setLoading(false);
      },
    });
  }, []);

    return { blogs, loading, error };
}