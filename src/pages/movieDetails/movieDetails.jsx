import { useParams } from "react-router-dom";
import { fetchDetails } from "../../store/movieDetailsSlice";
import { fetchCastData } from "../../store/movieCastSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrbitProgress } from "react-loading-indicators";
import "./movieDetails.css";
import { FaStar } from "react-icons/fa";
import MovieCategory from "../../components/MovieCategory/MovieCategory";
import TVCategory from "../../components/TVCategory";

export default function MovieDetails() {
  const { movieID } = useParams();
  const details = useSelector((state) => state.details.details);
  const { movieCast:cast, loading, error } = useSelector((state) => state.movieCast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movieID) {
      dispatch(fetchDetails({kind: "movie" , id : movieID}));
      dispatch(fetchCastData({kind: "movie" , id : movieID}));
      window.scrollTo(0, 0);
    }
  }, [movieID, dispatch]);

  console.log(cast)

  if (!details || details === "pending") {
    return (
      <div className="flex justify-center items-center h-screen">
        <OrbitProgress color="#e64d36" size="medium" />
      </div>
    );
  }

  if (error) return <p>Error fetching cast: {error}</p>;

  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="w-full h-full">
        <div
          className="imageBackDrop fixed w-full h-[600px] bg-cover bg-no-repeat movieShadow"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${details.backdrop_path})`,
          }}
        ></div>
      </div>

      <div className="py-44 px-24 grid grid-cols-3 max-lg:grid-cols-1 justify-center  relative  -mt-[400px] z-10">
        <div className="scrollSticky sticky top-[150px] w-72 md:w-96  h-fit ">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt="Poster"
            className="w-72 md:w-96 rounded-xl shadow-2xl"
          />

          <div className="mt-6 flex flex-col gap-4 w-full">
            <button className="bg-[#dd003f] px-8 py-3 rounded-lg text-xl font-bold text-white uppercase w-full">
              Watch Later
            </button>
            <button className="bg-[#dcf836] px-8 py-3 rounded-lg text-xl font-bold uppercase w-full">
              Add to Favorite
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col mb-16">
            <div className="text-white md:text-left ">
              <h1 className="text-2xl py-7 lg:text-4xl font-bold uppercase ">
                {details.title}
                <span className="text-gray-400 text-3xl font-normal ml-4">
                  {details.release_date?.split("-")[0]}
                </span>
              </h1>

              <div className="flex py-3 border-white border border-r-transparent border-l-transparent w-full lg:w-[50rem] ">
                <div className="flex border-r-[1px] gap-4 p-3">
                  <FaStar className="text-[#f8c92d] text-5xl" />
                  <div>
                    <div className="text-2xl">
                      {Math.floor(details.vote_average)}/10
                      <div className="uppercase text-blue-500 text-lg font-bold">
                        {details.vote_count} Reviews
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 flex justify-center items-center text-3xl">
                  Rate the Movie:
                </div>
              </div>
              <div className="text-[#f8c92d] hover:underline text-4xl pt-3 uppercase">
                Overview
              </div>
              <div className="w-full max-w-[600px] py-5 text-2xl text-white leading-relaxed break-words">
                {details.overview}
              </div>
              <div>
                <div className="flex border-b-[1px] w-full border-white justify-between items-center">
                  <h3 className="uppercase text-white text-xl py-2">cast</h3>
                  <div className="uppercase text-blue-500 text-xl">
                    Full Cast {cast?.length}
                  </div>
                </div>
                <div>
                  {cast && cast?.length > 0 ? (
                    cast?.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center mb-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              item.profile_path
                                ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                                : "/default-avatar.png"
                            }
                            alt={item.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <span className="text-white font-bold">
                            {item.name}
                          </span>
                        </div>
                        <h3 className="text-gray-400 italic">
                          {item.character}
                        </h3>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">No cast information available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <MovieCategory kind={"movie"} />
        <TVCategory kind={"tv"} />
      </div>
    </div>
  );
}
