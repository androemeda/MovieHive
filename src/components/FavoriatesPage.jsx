import { FaRegTrashAlt } from "react-icons/fa";
import { CiCircleChevUp , CiCircleChevDown } from "react-icons/ci";
import React, { useContext } from 'react'
import { AppContext } from "../App";

function FavoriatesPage() {

    let {favs , setFavs} = useContext(AppContext);

    const removeFavorite = (id) => {
        let arr = favs.filter((fav) => {return id !== fav.id})
        setFavs(arr);
    }

  return (

    <div>
    
    <div className="flex justify-center space-x-2 m-3">
        <button className="bg-blue-300 rounded-lg p-2 font-bold border border-black hover:scale-110 transition transform duration-300">ALL GENRE</button>
        <button className="bg-gray-400 rounded-lg p-2 font-bold border border-black hover:scale-110 transition transform duration-300">ACTION</button>
        <button className="bg-gray-400 rounded-lg p-2 font-bold border border-black hover:scale-110 transition transform duration-300">ROMANCE</button>
    </div>

    <div class="relative m-2">
    <table class="w-full text-sm text-left rtl:text-right">
        <thead class="text-xl font-bold bg-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 border border-black">
                    Name
                </th>
                <th scope="col" class="px-6 py-3 border border-black">
                    <div className="flex">
                        <button><CiCircleChevUp></CiCircleChevUp></button>
                        Avg Rating
                        <button><CiCircleChevDown></CiCircleChevDown></button>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3 border border-black">
                    <div className="flex">
                        <button><CiCircleChevUp></CiCircleChevUp></button>
                        Popularity
                        <button><CiCircleChevDown></CiCircleChevDown></button>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3 border border-black">
                    Genre
                </th>
                <th scope="col" class="px-6 py-3 border border-black">
                    Remove
                </th>
            </tr>
        </thead>
        <tbody>
        {favs.map((fav) => (
              <tr key={fav.id}>
                <th scope="row" className="px-6 py-4 font-medium">
                  {fav.name || fav.title}
                </th>
                <td className="px-6 py-4 font-medium">{fav.vote_average}</td>
                <td className="px-6 py-4 font-medium">{fav.popularity}</td>
                <td className="px-6 py-4 font-medium">
                  {(fav.genre_ids && fav.genre_ids.length > 0)
                    ? fav.genre_ids[0]
                    : "N/A"}
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

    {(favs.length == 0) ? <div className="flex justify-center items-center font-bold text-3xl mt-5">No Favoriates Added</div> : <></>}
    </div>

  )
}

export default FavoriatesPage