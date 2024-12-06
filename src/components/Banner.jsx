import React from 'react'
import Image from './../image.jpg'

function Banner() {
  return (
    <div className='relative'>
      <img src={Image}></img>
      <div className='flex items-center justify-center bg-gray-700 opacity-80 absolute bottom-0 w-full h-[10%]'>M3GAN</div>
    </div>
  )
}

export default Banner
