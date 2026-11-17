import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogsData } from "../hooks/useBlogsData";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const BlogStep = () => {
  const { blogs, loading, error } = useBlogsData();
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 9;

  const totalPages = Math.max(1, Math.ceil(blogs.length / blogsPerPage));

  const activePage = Math.min(currentPage, totalPages);

  const indexOfLastBlog = activePage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  if (loading) {
    return (
      <section className="bg-white py-20 mb-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="xl:h-[242px] h-[200px] w-full max-w-[450px] rounded-2xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500 font-medium">{error}</div>
    );
  }

  return (
    <section className="bg-white py-20 mb-40 lg:mb-[155px] md:mb-40 xl:mb-50 ">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* BLOG GRID */}
        {currentBlogs.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-lg">
            No blogs available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id || blog.slug || blog.title}
                className="group relative xl:h-[242px] h-[200px] w-full max-w-[450px] overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="absolute inset-0 aspect-[24/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 mt-[-15px] bottom-0 flex items-end justify-between gap-3 h-[74px] bg-[#FFFFFF33] px-4 pb-3 pt-12 backdrop-blur-[12px]">
                  <h3 className="max-w-[280px] text-sm font-semibold leading-5 text-slate-800">
                    {blog.title}
                  </h3>
                  <Link
                    to={`/blogs/${blog.slug}/`}
                    aria-label={`Read ${blog.title}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <LuArrowRight className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {currentBlogs.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            {/* PREV */}
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={activePage === 1}
              aria-label="Previous page"
              className={`flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 font-bold ${
                activePage === 1
                  ? "text-blue-400 cursor-not-allowed"
                  : "text-cyan-700 hover:text-green-500 cursor-pointer"
              }`}
            >
              <LuArrowLeft className="h-6 w-6" />
            </button>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-400 text-[18px]">
              {activePage} / {totalPages}
            </span>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={activePage === totalPages}
              aria-label="Next page"
              className={`flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 font-bold ${
                activePage === totalPages
                  ? "text-blue-400 cursor-not-allowed"
                  : "text-cyan-700 hover:text-green-500 cursor-pointer"
              }`}
            >
              <LuArrowRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogStep;