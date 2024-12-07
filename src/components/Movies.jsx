import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../App';

function Movies() {
  let [movies, setMovies] = useState([]);
  let [hoverId, setHoverId] = useState(null);
  let [pageNum, setPageNum] = useState(1);

  let { favs, setFavs } = useContext(AppContext);

  const showEmoji = (id) => {
    setHoverId(id);
  };

  const hideEmoji = () => {
    setHoverId(null);
  };

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavs(savedFavs);
  }, []);

  const ToggleEmoji = (movie) => {
    const isFavorite = favs.some((fav) => fav.id === movie.id);
    let updatedFavs;
    if (!isFavorite) {
      updatedFavs = [...favs, movie];
    } else {
      updatedFavs = favs.filter((fav) => fav.id !== movie.id);
    }
    setFavs(updatedFavs);
    localStorage.setItem('favorites', JSON.stringify(updatedFavs)); // Save to localStorage
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${
            import.meta.env.VITE_API_KEY
          }&page=${pageNum}`
        );
        console.log(response.data.results);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [pageNum]);

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        {movies.length == 0 ? (
          <div>...Loading</div>
        ) : (
          movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className="m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 relative hover:scale-110 transition transform duration-300 rounded-lg"
                onMouseEnter={() => showEmoji(movie.id)}
                onMouseLeave={hideEmoji}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${
                    movie.poster_path || movie.backdrop_path
                  }`}
                  className="rounded-lg"
                ></img>
                <div className="rounded-lg absolute flex bottom-0 bg-gray-400 w-full opacity-70 justify-center items-center h-[10%]">
                  {movie.title || movie.name}
                </div>
                <button
                  className="absolute aspect-square h-[10%] bg-black top-2 right-3 rounded-lg justify-center items-center text-xl"
                  style={{ display: movie.id == hoverId ? 'flex' : 'none' }}
                  onClick={() => ToggleEmoji(movie)}
                >
                  {favs.some((fav) => fav.id === movie.id) ? '❌' : '😍'}
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-center my-2">
        <button
          className="border-2 border-blue-300 p-1.5 rounded-l-full font-bold text-2xl"
          onClick={() => {
            if (pageNum > 1) setPageNum(pageNum - 1);
          }}
        >
          previous
        </button>
        <div className="border-2 border-blue-300 p-1.5 font-bold text-2xl">
          {pageNum}
        </div>
        <button
          className="border-2 border-blue-300 p-1.5 rounded-r-full font-bold text-2xl"
          onClick={() => setPageNum(pageNum + 1)}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Movies;
