import { Link } from 'react-router-dom'
import './SingleCard.css'

const SingleCard = ({id, vote_average, title, poster_path, kind}) => {
  return (
    
       <div className="flex-shrink-0 relative overflow-hidden movieCard">
      <h3 className="kind bg-yellow-600 absolute -rotate-45 top-3 -left-7 px-8 uppercase">{kind}</h3>
      <div className="img">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="min-w-72 w-full object-cover rounded-lg"
        />
      </div>
      <div className="info">
        <h2>{title}</h2>
        <p>{vote_average} / 10</p>
      </div>
      <div className="overlay absolute h-full w-full top-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[#00000050]">
        <Link to={`/${kind}/${id}`} className="moredetails text-white px-9 py-3 bg-red-600 rounded-full font-bold flex justify-center items-center">
          More Details
        </Link>
      </div>
    </div>
  )
}

export default SingleCard