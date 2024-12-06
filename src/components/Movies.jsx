import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Movies() {

  let [movies , setMovies] = useState([]);

  let [hoverId , setHoverId] = useState(null);

  const showEmoji = (id) => {
    setHoverId(id);
  }

  const hideEmoji = () => {
    setHoverId(null);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&page=1`
        );
        console.log(response.data.results);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='flex flex-wrap justify-center items-center'>
      {(movies.length == 0) ? <div>...Loading</div> : movies.map((movie) => {
        return (
          <div key={movie.id} className='m-2 w-1/5 relative hover:scale-110 transition transform duration-300 rounded-lg'
            onMouseEnter={() => showEmoji(movie.id)}
            onMouseLeave={hideEmoji}
          >
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path || movie.backdrop_path}`} className='rounded-lg'></img>
            <div className='rounded-lg absolute flex bottom-0 bg-gray-400 w-full opacity-70 justify-center items-center h-[10%]'>{movie.title || movie.name}</div>
            <button className='absolute aspect-square h-[10%] bg-black top-2 right-3 rounded-lg justify-center items-center text-xl'
              style={{display : (movie.id == hoverId) ? "flex" : "none"}}
            >😍</button>
          </div>
        )
      })}
    </div>
  );
}

export default Movies;


/**
 * 
 * https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&page=1
 */