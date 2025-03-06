import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchAllTV } from "../store/discoverTVSlice";
import { useEffect, useMemo } from "react";
import SingleCard from "../components/SingleCard/SingleCart";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { allTV: movies, loading, error } = useSelector((state) => state.allTV);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const pages = useMemo(() => {
    let allPages = currentPage != 1 ? [1] : [];
    for (let i = currentPage; i <= currentPage + 3; i++) {
      allPages.push(i);
      if (i == 500) {
        break;
      }
    }
    if (currentPage !== 1) {
      allPages.splice( 1 , 0 , currentPage - 1);
    }

    return allPages;
  }, [currentPage]);

  console.log(pages);

  useEffect(() => {
    dispatch(fetchAllTV(currentPage));
    window.scrollTo(0, 0);
  }, [dispatch, currentPage]);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-32 auto text-white font-bold text-9xl">
        TV
      </div>
      <div className="py-16 px-10 mt-52 text-white bg-[#0f2133]">
        <div className="grid grid-cols-1 justify-center items-center lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {movies.results?.map((movie) => (
            <SingleCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              poster_path={movie.poster_path}
              kind="movie"
            />
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {pages.map((num, index) => (
            <button
              key={index}
              onClick={() => typeof num === "number" && handlePageChange(num)}
              className={`px-4 py-2 rounded ${
                currentPage === num
                  ? "bg-blue-600"
                  : "bg-gray-700 hover:bg-gray-500"
              }`}
              disabled={num === "..."}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
