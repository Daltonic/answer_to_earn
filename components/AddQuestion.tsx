import React from 'react'
import { FaTimes } from 'react-icons/fa'

const AddQuestion: React.FC = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 scale-0`}
    >
      <div className="bg-[#16112F] text-[#BBBBBB] shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Add question</p>
            <button type="button" className="border-0 bg-transparent focus:outline-none">
              <FaTimes />
            </button>
          </div>
          <form className="flex flex-col justify-center items-start rounded-xl mt-5 mb-5">
            <label className="text-[12px]">Title</label>
            <div className="py-4 w-full border border-[#212D4A] rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                placeholder="Question title"
                className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm"
              />
            </div>
            <label className="text-[12px]">ETH Price</label>
            <div className="py-4 w-full border border-[#212D4A] rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                placeholder="ETH e.g 0.02"
                className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm"
              />
            </div>
            <label className="text-[12px]">Tags</label>
            <div
              className="py-4 w-full border border-[#212D4A] 
              rounded-full flex items-center px-4 mb-3 mt-2"
            >
              <input
                placeholder="Separate tags with commas, eg. php, css"
                className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm"
              />
            </div>

            <label className="text-[12px]">Question</label>
            
            <textarea
              placeholder="Drop your question here"
              className="h-[162px] w-full bg-transparent border border-[#212D4A] rounded-xl py-3 px-3
              focus:outline-none focus:ring-0 resize-none
              placeholder-[#3D3857] text-sm"
            />
          </form>

          <button
            className="text-sm bg-blue-600 rounded-full w-[150px] h-[48px] text-white
            right-2 sm:right-10 hover:bg-blue-700 transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddQuestion
