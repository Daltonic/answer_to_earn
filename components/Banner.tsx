import React from 'react'
import { BiNetworkChart } from 'react-icons/bi'

const Banner: React.FC = () => {
  return (
    <div className="w-full py-3 px-4 sm:px-10">
      <div className="mt-16 sm:mt-9 h-fit relative text-zinc-200">
        <h1
          className="font-extrabold text-[59px] inline-block mt-2
          from-blue-700 to-pink-700 bg-gradient-to-r bg-clip-text text-transparent"
        >
          Ask Question
        </h1>

        <div className="flex justify-between items-center font-bold text-sm mt-6 h-[20vh]">
          <div className="flex space-x-2 items-center h-[24px]">
            <BiNetworkChart className="text-[#212D4A] w-[24px] h-[24px]" />
            <p className="hidden sm:flex">1 questions</p>
          </div>

          <button
            className="h-[48px] w-[145px] border rounded-full tracking-tighter
           border-blue-600 hover:text-blue-600 transition-colors duration-300"
          >
            Ask a Question
          </button>
        </div>
        <hr className="bottom border-zinc-600 w-full" />
      </div>
    </div>
  )
}

export default Banner
