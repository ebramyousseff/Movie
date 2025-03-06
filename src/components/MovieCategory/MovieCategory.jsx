import { useEffect, useRef, useState } from "react";
import { fetchMovie } from "../../store/movieSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import "./movieCategory.css";
import { Link } from "react-router-dom";
import { fetchTv } from "../../store/tvSlice";
import SingleCard from "../SingleCard/SingleCart";

const MovieCategory = ({ kind }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) =>
    kind == "movie" ? state.movie.movies : state.tv.movies
  );
  const [isActive, setIsActive] = useState(`${kind}/popular`);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (kind == "movie") {
      dispatch(fetchMovie(isActive));
    } else {
      dispatch(fetchTv(isActive));
    }
  }, [dispatch, isActive]);

  const categories = [
    { name: "Popular", endpoint: `${kind}/popular` },
    { name: "Coming Soon", endpoint: "movie/upcoming" },
    { name: "Top Rated", endpoint: "movie/top_rated" },
    { name: "Most Viewed", endpoint: "discover/movie" },
  ];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  console.log(isActive);

  return (
    <section className="py-16 px-10 relative">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-3xl uppercase font-bold">{kind}</h3>
          <Link to="/movie"><button className="text-white text-lg uppercase flex items-center font-semibold hover:text-[#dcf836]">
            View all <IoIosArrowForward className="text-white" />
          </button></Link>
        </div>
        <div className="flex w-1/3 gap-4 uppercase font-semibold">
          {categories.map((category) => (
            <h3
              key={category.endpoint}
              className={`text-lg cursor-pointer transition-colors duration-300 ${
                isActive === category.endpoint
                  ? "text-[#dcf836]"
                  : "text-white hover:text-[#dcf836]"
              }`}
              onClick={() => setIsActive(category.endpoint)}
            >
              {category.name}
            </h3>
          ))}
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-blue-600 "
        onClick={() => handleScroll("left")}
      >
        <IoIosArrowBack size={70} />
      </button>

      <div className="relative">
        <div ref={scrollRef} className="flex gap-3 overflow-hidden py-8 px-2">
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((item) => (
              <SingleCard
                key={item.id}
                id={item.id}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                title={item.title}
                kind={kind}
              />
            ))
          ) : (
            <p className="text-white">No movies available</p>
          )}
        </div>
      </div>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-blue-600 "
        onClick={() => handleScroll("right")}
      >
        <IoIosArrowForward size={70} />
      </button>
    </section>
  );
};

export default MovieCategory;
