import React from 'react';
import Image from './../download.png';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="flex fixed top-0 left-0 w-full z-10 bg-white shadow-md">
      <div className="flex justify-center items-center space-x-2 m-2 w-full sm:justify-start sm:space-x-4">
        <img src={Image}></img>
        <Link to={'/'} className="font-bold text-xl text-blue-300">
          Movies
        </Link>
        <Link to={'/fav'} className="font-bold text-xl text-blue-300">
          Favoriates
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
