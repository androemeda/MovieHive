import { FaRegTrashAlt } from 'react-icons/fa';
import { CiCircleChevUp, CiCircleChevDown } from 'react-icons/ci';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';

function FavoriatesPage() {
  let { favs, setFavs } = useContext(AppContext);

  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const GENRE_MAP = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  const removeFavorite = (id) => {
    let arr = favs.filter((fav) => {
      return id !== fav.id;
    });
    setFavs(arr);
  };

  const handleFilter = (genre) => {
    setFilter(genre);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredFavs = favs
    .filter((fav) => {
      if (filter === 'All') return true;
      if (filter === 'Action' && fav.genre_ids.includes(28)) return true;
      if (filter === 'Romance' && fav.genre_ids.includes(10749)) return true;
      if (filter === 'Animation' && fav.genre_ids.includes(16)) return true;
      if (filter === 'Adventure' && fav.genre_ids.includes(12)) return true;
      if (filter === 'Science Fiction' && fav.genre_ids.includes(878))
        return true;
      if (filter === 'Fantasy' && fav.genre_ids.includes(14)) return true;
      return false;
    })
    .filter((fav) => {
      return (
        (fav.name &&
          fav.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (fav.title &&
          fav.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

  const sortedFavs = filteredFavs.sort((a, b) => {
    if (sortBy === 'rating') {
      return sortOrder === 'asc'
        ? a.vote_average - b.vote_average
        : b.vote_average - a.vote_average;
    } else if (sortBy === 'popularity') {
      return sortOrder === 'asc'
        ? a.popularity - b.popularity
        : b.popularity - a.popularity;
    }
    return 0;
  });

  return (
    <div>
      <div className="flex justify-center space-x-2 m-3">
        <button
          className="bg-blue-300 rounded-lg p-2 font-bold border border-black hover:scale-110 transition transform duration-300"
          onClick={() => handleFilter('All')}
        >
          All Genre
        </button>
        <button
          className="bg-gray-400 rounded-lg p-2 font-bold border border-black hover:scale-110 transition transform duration-300"
          onClick={() => handleFilter('Action')}
        >
          Action
        </button>
        <button
          className="bg-gray-400 rounded-lg p-2 font-bold border border-black hover:scale-110 transition transform duration-300"
          onClick={() => handleFilter('Romance')}
        >
          Romance
        </button>
        <button
          className="bg-gray-400 rounded-lg p-2 font-bold border border-black hover:scale-110 transition transform duration-300"
          onClick={() => handleFilter('Animation')}
        >
          Animation
        </button>
        <button
          className="bg-gray-400 rounded-lg p-2 font-bold border border-black hover:scale-110 transition transform duration-300"
          onClick={() => handleFilter('Adventure')}
        >
          Adventure
        </button>
        <button
          className="bg-gray-400 rounded-lg p-2 font-bold border border-black hover:scale-110 transition transform duration-300"
          onClick={() => handleFilter('Science Fiction')}
        >
          Science Fiction
        </button>
        <button
          className="bg-gray-400 rounded-lg p-2 font-bold border border-black hover:scale-110 transition transform duration-300"
          onClick={() => handleFilter('Fantasy')}
        >
          Fantasy
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="p-2 border border-gray-300 rounded-lg w-1/2"
        />
      </div>

      <div className="relative m-2">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xl font-bold bg-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 border border-black">
                Name
              </th>
              <th scope="col" className="px-6 py-3 border border-black">
                <div className="flex">
                  <button onClick={() => handleSort('rating')}>
                    <CiCircleChevUp />
                  </button>
                  Avg Rating
                  <button onClick={() => handleSort('rating')}>
                    <CiCircleChevDown />
                  </button>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 border border-black">
                <div className="flex">
                  <button onClick={() => handleSort('popularity')}>
                    <CiCircleChevUp />
                  </button>
                  Popularity
                  <button onClick={() => handleSort('popularity')}>
                    <CiCircleChevDown />
                  </button>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 border border-black">
                Genre
              </th>
              <th scope="col" className="px-6 py-3 border border-black">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedFavs.map((fav) => (
              <tr key={fav.id}>
                <th scope="row" className="px-6 py-4 font-medium">
                  {fav.name || fav.title}
                </th>
                <td className="px-6 py-4 font-medium">{fav.vote_average}</td>
                <td className="px-6 py-4 font-medium">{fav.popularity}</td>
                <td className="px-6 py-4 font-medium">
                  {fav.genre_ids && fav.genre_ids.length > 0
                    ? fav.genre_ids
                        .map((id) => GENRE_MAP[id] || 'N/A')
                        .join(', ')
                    : 'N/A'}
                </td>
                <td className="px-6 py-4 text-red-600 text-xl font-medium">
                  <button onClick={() => removeFavorite(fav.id)}>
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedFavs.length === 0 ? (
        <div className="flex justify-center items-center font-bold text-3xl mt-5">
          No Favorites Added
        </div>
      ) : null}
    </div>
  );
}

export default FavoriatesPage;
