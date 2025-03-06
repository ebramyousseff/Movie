import { data } from "../data/data";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShare, FaRegHeart, FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";

const SliderData = () => {
  const [current, setCurrent] = useState(0);
  const currentData = data[current];

  const handleNext = () => {
    setCurrent((curr) => (curr === data.length - 1 ? 0 : current + 1));
  };

  const handlePrev = () => {
    setCurrent((curr) => (curr === 0 ? data.length - 1 : current - 1));
  };

  return (
    <section className="sec py-2 relative w-full h-[100vh]">
      <div className=" flex flex-row-reverse justify-between items-center">
        <div className="min-w-fit px-60 py-40">
          <img
            src={currentData.image}
            alt={currentData.title}
            className=" h-[32rem]"
          />
        </div>
        <div className="flex flex-col mx-52 gap-7">
          <div className="w-auto">
            <h3 className="text-white text-8xl leading-none uppercase font-bold whitespace-pre-line">
              {currentData.title}
              <span className="text-6xl font-normal text-gray-400 ml-4">
                2024
              </span>
            </h3>
          </div>
          <div className="flex gap-7 w-full items-center mb-3">
            <Link to="/">
              <div className="text-2xl flex text-[#dd003f] font-bold uppercase items-center">
                <div className="rounded-full border border-[#dd003f] w-14 h-14 relative mr-5">
                  <FaPlay className="absolute top-[15px] text-[#dd003f] right-[13px] text-2xl" />
                </div>
                Watch Trailer
              </div>
            </Link>
            <div className="text-2xl flex text-[#dd003f] font-bold uppercase items-center">
              <div className="rounded-full border border-[#dd003f] w-14 h-14 relative mr-5">
                <FaRegHeart className="absolute top-[15px] text-[#dd003f] font-bold right-[14px] text-[25px]" />
              </div>
              Add To Favorite
            </div>
            <div className="text-2xl flex text-[#dd003f] font-bold uppercase items-center">
              <div className="rounded-full border border-[#dd003f] w-14 h-14 relative mr-5">
                <FaShare className="absolute top-[15px] text-[#dd003f] right-[13px] text-2xl" />
              </div>
              Share
            </div>
          </div>
          <div className="flex gap-9 items-center w-full">
            <div className="text-white text-2xl flex items-center">
              <FaStar className="text-yellow-500 text-4xl mr-4" />
              <span className="text-3xl">{currentData.rating}</span>/10
            </div>
            <div className="text-2xl text-gray-400 flex">
              Release: {currentData.release}
            </div>
          </div>

          <Link to="/">
            <button className="text-white text-xl border rounded-full border-none font-bold uppercase bg-[#dd003f] w-40 h-14 hover:bg-black hover:text-yellow-500">
              More Details
            </button>
          </Link>
        </div>
      </div>

      <div>
        <button className="absolute top-96 left-28" onClick={handlePrev}>
          <IoIosArrowBack className="text-blue-600 text-7xl" />
        </button>
        <button className="absolute top-96 right-28" onClick={handleNext}>
          <IoIosArrowForward className="text-blue-600 text-7xl" />
        </button>
      </div>
    </section>
  );
};

export default SliderData;
