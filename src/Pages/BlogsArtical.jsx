import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useBlogsData } from "../hooks/useBlogsData";
import CommentSection from "../Components/CommentSection";
import { Helmet } from "react-helmet-async";
import { LuCalendarDays } from "react-icons/lu";

const BlogsArticle = () => {
  const { slug } = useParams();
  const { blogs, loading } = useBlogsData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 text-center text-slate-500 font-jakarta">
        Loading article...
      </div>
    );
  }

  const article = blogs.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="py-20 text-center font-bold">Article not found.</div>
    );
  }

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>{article.metaTitle || article.title}</title>

        <meta
          name="description"
          content={article.metaDescription || article.title}
        />

        <link
          rel="canonical"
          href={`https://growmoreglobalvisa.com/blogs/${slug}/`}
          key="canonical"
        />

        <meta property="og:type" content="article" />

        <meta
          property="og:title"
          content={article.metaTitle || article.title}
        />

        <meta
          property="og:description"
          content={article.metaDescription || article.title}
        />

        <meta property="og:image" content={article.image} />

        <meta
          property="og:url"
          content={`https://growmoreglobalvisa.com/blogs/${slug}/`}
          key="og-url"
        />

        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-white font-jakarta text-[#042325]">
        {/* HEADER */}
        <section className="bg-slate-100 min-h-[170px] w-full max-w-[1321px] mx-auto px-4 sm:px-6 py-10 sm:py-14 text-sky-800 rounded-2xl sm:rounded-[34px] mt-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h1 className="text-xl sm:text-2xl md:text-[32px] font-semibold leading-snug break-words">
              {article.title}
            </h1>

            <p className="text-gray-500 text-sm mt-4 sm:mt-6 flex items-center gap-2">
              <LuCalendarDays className="h-4 w-4 text-slate-400" />{" "}
              {article.date}
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-12 max-w-5xl mx-auto px-6">
          {/* IMAGE */}
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full rounded-4xl mb-8 object-cover max-h-[640px]"
            />
          )}

          {/* MARKDOWN CONTENT */}
          <article className="blog-article">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => (
                  <h1
                    className="text-[28px] md:text-[34px] font-bold text-[#042325] mt-8 mb-4 leading-tight"
                    {...props}
                  />
                ),

                h2: ({ ...props }) => (
                  <h2
                    className="text-[#28535B] text-[22px] md:text-[26px] font-semibold mt-10 mb-3 leading-tight"
                    {...props}
                  />
                ),

                h3: ({ ...props }) => (
                  <h3
                    className="text-[#1d3c42] text-[18px] md:text-[20px] font-semibold mt-8 mb-2"
                    {...props}
                  />
                ),

                p: ({ ...props }) => (
                  <p
                    className="text-[15px] md:text-[16px] leading-[1.8] text-[#333] mb-5"
                    {...props}
                  />
                ),

                ul: ({ ...props }) => (
                  <ul className="pl-6 mb-5 list-disc space-y-2 text-[#333]" {...props} />
                ),

                ol: ({ ...props }) => (
                  <ol className="pl-6 mb-5 list-decimal space-y-2 text-[#333]" {...props} />
                ),

                li: ({ ...props }) => (
                  <li className="marker:text-[#333333] leading-[1.8]" {...props} />
                ),

                strong: ({ ...props }) => (
                  <strong className="font-semibold text-[#042325]" {...props} />
                ),

                em: ({ ...props }) => (
                  <em className="italic text-[#1c3740]" {...props} />
                ),

                a: ({ ...props }) => (
                  <a
                    className="text-[#0ea5a4] underline decoration-2 underline-offset-2 hover:text-[#0c8c8c]"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),

                blockquote: ({ ...props }) => (
                  <blockquote
                    className="border-l-4 border-[#2ED09B] bg-[#f3fbf8] px-4 py-3 my-6 italic text-[#24464f] rounded-r-lg"
                    {...props}
                  />
                ),

                hr: ({ ...props }) => (
                  <hr className="my-8 border-t border-slate-200" {...props} />
                ),

                img: ({ ...props }) => (
                  <img
                    className="w-full my-8 rounded-2xl object-cover shadow-sm"
                    {...props}
                  />
                ),

                pre: ({ ...props }) => (
                  <pre
                    className="overflow-x-auto rounded-xl bg-slate-900 text-slate-100 p-4 my-6 text-sm leading-6"
                    {...props}
                  />
                ),

                code: ({ inline, ...props }) =>
                  inline ? (
                    <code
                      className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-[#0f172a]"
                      {...props}
                    />
                  ) : (
                    <code className="text-sm" {...props} />
                  ),

                table: ({ ...props }) => (
                  <div className="overflow-x-auto my-6 border border-gray-300 rounded-lg">
                    <table
                      className="w-full text-sm border-collapse"
                      {...props}
                    />
                  </div>
                ),

                thead: ({ ...props }) => (
                  <thead className="bg-gray-200" {...props} />
                ),

                th: ({ ...props }) => (
                  <th
                    className="border border-gray-300 px-4 py-2 text-left font-semibold text-[#333]"
                    {...props}
                  />
                ),

                td: ({ ...props }) => (
                  <td
                    className="border border-gray-300 px-4 py-2 text-[#333] align-top"
                    {...props}
                  />
                ),

                tr: ({ ...props }) => (
                  <tr className="hover:bg-gray-50 transition" {...props} />
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </article>

          {/* CONTACT BAR */}
          <div className="w-full bg-[#2ED09B] rounded-lg p-5 shadow-sm my-8">
            <div className="flex flex-col md:flex-row justify-start items-center gap-2 md:gap-4 pl-3 text-black font-semibold text-center text-[15px] sm:text-[17px]">
              <div className="flex items-center">
                <span>Email: </span>
                <a
                  href="mailto:study@growmore.one"
                  className="ml-1 text-blue-500 transition-colors"
                >
                  study@growmore.one
                </a>
              </div>

              <span className="hidden md:inline text-black">|</span>

              <div className="flex items-center">
                <span>WhatsApp: </span>
                <a
                  href="https://wa.me/919081899669"
                  className="ml-1 text-blue-500"
                >
                  (+91) 9081899669
                </a>
              </div>

              <span className="hidden md:inline text-black">|</span>

              <div className="flex items-center">
                <span>Phone: </span>
                <a href="tel:+919081899668" className="ml-1 text-black">
                  (+91) 9081899668
                </a>
              </div>
            </div>
          </div>

          <CommentSection />
        </section>
      </div>
    </>
  );
};

export default BlogsArticle;