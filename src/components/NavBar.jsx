import React from 'react'
import Image from './../download.png'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='flex'>
      <div className='flex justify-center items-center space-x-2 m-2'>
        <img src={Image}></img>
        <Link to={"/"} className='font-bold text-xl text-blue-300'>Movies</Link>
        <Link to={"/fav"} className='font-bold text-xl text-blue-300'>Favoriates</Link>
      </div>
    </div>
  )
}

export default NavBar;