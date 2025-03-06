import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults } from "../store/searchDetailsSlice";
import SingleCard from "../components/SingleCard/SingleCart";

const SearchResults = () => {
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector(
    (state) => state.search
  );
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "Batman";

  useEffect(() => {
    if (query.trim() !== "") {
      dispatch(fetchSearchResults({ query, page: 1 }));
    }
  }, [dispatch, query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="my-32 mx-14">
      <h2 className="text-2xl text-white mb-4">Results for "{query}"</h2>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {searchResults?.length > 0 ? (
        searchResults.map((item) => (
          <Link
            to={`/movie/${item.id}`}
            key={item.id}
            className="object-cover w-full"
          >
            
            {item.poster_path ? (
              
              <SingleCard
                id={item.id}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                title={item.title}
                kind={item.media_type}
                
              />
              
            ) : (
              <div className="w-80 h-64 bg-gray-700 flex items-center justify-center rounded-lg">
                <p className="text-white font-bold text-2xl">No Image</p>
              </div>
            )}
           
          </Link>
          
        ))
      ) : (
        <p>No results found.</p>
      )}
      </div>
    </div>
  );
};

export default SearchResults;
