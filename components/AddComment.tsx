import React from 'react'
import { FaTimes } from 'react-icons/fa'

const AddComment: React.FC = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 scale-0`}
    >
      <div className="bg-[#16112F] text-[#BBBBBB] shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Answer the question</p>
            <button type="button" className="border-0 bg-transparent focus:outline-none">
              <FaTimes />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl mt-5 mb-5">
            <textarea
              className="h-[25vh] w-full bg-transparent border border-[#212D4A] rounded-xl py-3 px-3
              focus:outline-none focus:ring-0 resize-none"
              placeholder="Type your comment here..."
            />
          </div>

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

export default AddComment
