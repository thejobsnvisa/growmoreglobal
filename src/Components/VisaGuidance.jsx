import { useEffect, useState } from "react";
import { Play } from "lucide-react";

const VisaGuidance = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Read environment variables inside useEffect to ensure dynamic runtime access
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

    const fetchYouTubeVideos = async () => {
      try {
        setLoading(true);
        setError("");

        if (!apiKey) {
          throw new Error("YouTube API key (VITE_YOUTUBE_API_KEY) is missing in .env");
        }

        if (!channelId) {
          throw new Error("YouTube Channel ID (VITE_YOUTUBE_CHANNEL_ID) is missing in .env");
        }

        // =========================================
        // STEP 1: Get channel information
        // =========================================
        const channelUrl =
          `https://www.googleapis.com/youtube/v3/channels` +
          `?part=contentDetails` +
          `&id=${channelId}` +
          `&key=${apiKey}`;

        const channelResponse = await fetch(channelUrl);
        const channelData = await channelResponse.json();

        if (!channelResponse.ok || channelData.error) {
          console.error("YouTube Channel API Error:", channelData);
          throw new Error(
            channelData?.error?.message || "Failed to fetch YouTube channel",
          );
        }

        if (!channelData.items?.length) {
          throw new Error("No YouTube channel found for this Channel ID.");
        }

        const uploadsPlaylistId =
          channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;

        if (!uploadsPlaylistId) {
          throw new Error("YouTube uploads playlist was not found.");
        }

        // =========================================
        // STEP 2: Get latest videos
        // =========================================
        const videosUrl =
          `https://www.googleapis.com/youtube/v3/playlistItems` +
          `?part=snippet,contentDetails` +
          `&playlistId=${uploadsPlaylistId}` +
          `&maxResults=10` +
          `&key=${apiKey}`;

        const videosResponse = await fetch(videosUrl);
        const videosData = await videosResponse.json();

        if (!videosResponse.ok || videosData.error) {
          console.error("YouTube Videos API Error:", videosData);
          throw new Error(
            videosData?.error?.message || "Failed to fetch YouTube videos",
          );
        }

        // =========================================
        // STEP 3: Format videos
        // =========================================
        const formattedVideos = (videosData.items || [])
          .map((item) => ({
            id: item?.contentDetails?.videoId,
            title: item?.snippet?.title,
            thumbnail:
              item?.snippet?.thumbnails?.high?.url ||
              item?.snippet?.thumbnails?.medium?.url ||
              item?.snippet?.thumbnails?.default?.url,
            publishedAt: item?.snippet?.publishedAt,
          }))
          .filter((video) => video.id);

        setVideos(formattedVideos);

        // Automatically select latest video
        if (formattedVideos.length > 0) {
          setSelectedVideo(formattedVideos[0]);
        } else {
          throw new Error(
            "The channel was found, but no videos were returned.",
          );
        }
      } catch (err) {
        console.error("YouTube API Error:", err);
        setError(err?.message || "Unable to load YouTube videos.");
        setVideos([]);
        setSelectedVideo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, []);

  // Play selected video
  const playVideo = (video) => {
    setSelectedVideo(video);
  };

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:px-10 lg:py-16 xl:px-16 2xl:px-[100px]">
        <div className="flex w-full min-w-0 flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:justify-between lg:gap-8 xl:gap-12">
          
          {/* LEFT CONTENT */}
          <div className="w-full min-w-0 max-w-[560px] lg:w-[42%] lg:flex-shrink-0 xl:max-w-[520px]">
            <div className="mb-2 flex items-center gap-[10px] sm:mb-3">
              <span className="text-[26px] leading-tight text-[#338292] sm:text-[34px] md:text-[38px] lg:text-[36px] xl:text-[40px]">
                Personalized{" "}
              </span>
            </div>
            <div className="mt-[-8px] sm:mt-[-12px] lg:mt-[-20px]">
              <span className="text-[32px] font-bold leading-tight text-[#5B9E7D] sm:text-[40px] md:text-[46px] lg:text-[42px] xl:text-[54px] 2xl:text-[60px]">
                Visa Guidance
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 text-base font-semibold leading-[1.5] text-[#4695BD] sm:mt-6 sm:text-lg lg:mt-3 xl:text-[20px]">
              Interactive{" "}
              <span className="text-xl font-bold text-[#12648E] sm:text-[22px]">Live</span>{" "}
              <span className="text-xl font-bold text-[#12648E] sm:text-[22px]">
                Sessions{" "}
              </span>{" "}
              with{" "}
              <span className="text-xl font-bold text-teal-600 sm:text-[22px]">
                Krunal Nayak{" "}
              </span>
              Explore essential immigration and
              <span className="sm:hidden"> </span> visa information
            </p>

            {/* THUMBNAILS */}
            <div className="scrollbar-hide mt-6 flex w-full min-w-0 gap-3 overflow-x-auto pb-2 sm:mt-7 lg:gap-2 xl:gap-3">
              {loading ? (
                <>
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-[100px] w-[150px] flex-shrink-0 animate-pulse rounded-[15px] bg-gray-200 sm:h-[120px] sm:w-[165px] lg:h-[110px] lg:w-[145px] xl:h-[135px] xl:w-[165px]"
                    />
                  ))}
                </>
              ) : videos.length > 0 ? (
                videos.slice(0, 3).map((video) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => playVideo(video)}
                    aria-label={`Play ${video.title}`}
                    className="group relative h-[100px] w-[150px] flex-shrink-0 overflow-hidden rounded-[15px] sm:h-[120px] sm:w-[165px] lg:h-[110px] lg:w-[145px] xl:h-[135px] xl:w-[165px]"
                  >
                    {/* Thumbnail */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    {selectedVideo?.id === video.id ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#4B9DA8]/40">
                        <span className="rounded-full bg-[#55AEB9]/95 px-3 py-1 text-center text-[10px] font-medium leading-tight text-white sm:text-[11px]">
                          Currently
                          <br />
                          Playing
                        </span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#58B9C7]/90 sm:h-9 sm:w-9">
                          <Play
                            size={14}
                            fill="white"
                            className="ml-[2px] text-white"
                          />
                        </div>
                      </div>
                    )}
                  </button>
                ))
              ) : (
                <div className="w-full">
                  <p className="text-sm text-red-500">
                    {error || "No videos found."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT VIDEO PLAYER */}
          <div className="flex w-full min-w-0 flex-1 justify-center lg:justify-end">
            <div className="relative aspect-video w-full max-w-[650px] overflow-hidden rounded-[18px] bg-black sm:rounded-[22px] lg:rounded-[25px]">
              {selectedVideo ? (
                <iframe
                  key={selectedVideo.id}
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center px-5 text-center text-sm text-white sm:text-base">
                  {loading ? "Loading videos..." : error || "No videos found"}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisaGuidance;