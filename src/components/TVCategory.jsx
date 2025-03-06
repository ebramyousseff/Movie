import { useEffect, useRef, useState } from "react";
import { fetchTv } from "../store/tvSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import SingleCard from "./SingleCard/SingleCart";
import { Link } from "react-router-dom";

const TVCategory = ({kind}) => {
  const dispatch = useDispatch();
  const tv = useSelector((state) => state.tv.movies);
  const [isActive, setIsActive] = useState("tv/popular");
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTv(isActive));
  }, [dispatch, isActive]);

  const categories = [
    { name: "Popular", endpoint: "tv/popular" },
    { name: "Coming Soon", endpoint: "tv/airing_today" },
    { name: "Top Rated", endpoint: "tv/top_rated" },
    { name: "Most Viewed", endpoint: "discover/tv" },
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

  return (
    <section className="py-16 px-10 relative">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-3xl uppercase font-bold">TV</h3>
          <Link to="/tv"><button className="text-white text-lg uppercase flex items-center font-semibold hover:text-[#dcf836]">
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
          {Array.isArray(tv) && tv.length > 0 ? (
            tv.map((item) => (
              <SingleCard
                key={item.id}
                id={item.id}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                title={item.title || item.name}
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

export default TVCategory;
