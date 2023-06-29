import Image from 'next/image'
import logo from '@/assets/images/Union.png'
import { AiOutlineSearch } from 'react-icons/ai'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header
      className="border-b border-zinc-600 h-[80px] w-full flex
      justify-between items-center relative mb-2 px-3 sm:px-10"
    >
      <Image
        width="60"
        height="32"
        src={logo}
        alt="logo"
        className="ml-2 sm:ml-0"
      />

      <div
        className="h-[48px] w-[90%] sm:w-[601px] border border-zinc-600
        rounded-full px-2 sm:px-4 space-x-2 absolute flex sm:top-2 sm:mb-0
        top-10 sm:flex items-center sm:ml-80 mt-[12%] sm:mt-2"
      >
        <AiOutlineSearch className="text-white w-5 ml-2" />

        <input
          placeholder="Search Here"
          className="bg-transparent -mt-1 outline-none text-sm placeholder:text-xs
          decoration-2 hover:underline decoration-purple-700 placeholder:text-white"
        />
      </div>

      <button
        className="text-sm bg-blue-600 rounded-full w-[150px] h-[48px] 
        hover:underline underline-offset-2 decoration-purple-700 decoration-2
        absolute right-2 sm:right-10"
      >
        Connect wallet
      </button>
    </header>
  )
}

export default Header
