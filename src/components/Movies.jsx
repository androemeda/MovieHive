import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Movies() {

  let [movies , setMovies] = useState([]);

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
      {movies.map((movie) => {
        return <div key={movie.id} className='m-2 w-1/5 relative hover:scale-110 transition transform duration-300 rounded-lg'>
          <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path || movie.backdrop_path}`} className='rounded-lg'></img>
          <div className='rounded-lg absolute flex bottom-0 bg-gray-400 w-full opacity-70 justify-center items-center h-[10%]'>{movie.title || movie.name}</div>
        </div>
      })}
    </div>
  );
}

export default Movies;


/**
 * 
 * https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&page=1
 */