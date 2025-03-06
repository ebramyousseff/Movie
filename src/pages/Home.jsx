import SliderData from "../components/SliderData";
import MovieCategory from "../components/MovieCategory/MovieCategory";
import TVCategory from "../components/TVCategory";

const Home = () => {
  return (
    <div className="">
      <SliderData />
      <div className="bg-[#020d18]">
        <MovieCategory kind={"movie"} />
        <TVCategory kind={"tv"} />
      </div>
    </div>
  );
};

export default Home;
