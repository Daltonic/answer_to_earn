import Head from 'next/head'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { BsCalendar3, BsFillTrophyFill } from 'react-icons/bs'
import Header from '@/components/Header'
import { FaEthereum } from 'react-icons/fa'
import { Tags, TagsSm } from '@/components/Tags'
import Identicon from 'react-identicons'
import React from 'react'

export default function Question() {
  return (
    <div>
      <Head>
        <title>Question</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen radial-gradient">
        <Header />

        <div className="mt-16 sm:mt-9 px-3 sm:px-10">
          <button
            className="flex justify-center items-center text-sm rounded-full
          w-[100px] h-[48px] right-2 sm:right-10 border border-[#212D4A] 
          transition-colors duration-300 space-x-2 hover:border-white"
          >
            <MdOutlineArrowBackIosNew className="text-[#91A7F3]" />
            <span className="text-white text-[14px]">Back</span>
          </button>

          <Details />

          <hr className="bottom border-[#212D4A] w-full my-7" />

          <button
            className="text-sm bg-blue-600 rounded-full w-[150px] h-[48px] text-white
            right-2 sm:right-10 hover:bg-blue-700  transition-colors duration-300"
          >
            Add Answer
          </button>

          <div className="flex flex-col mt-10 items-center space-y-4">
            <BsFillTrophyFill className="text-[#525F80]" size={40} />
            <p className="text-[#BBBBBB]">Be the first one to drop an answer.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

const Details: React.FC = () => {
  return (
    <>
      <div className="flex flex-col mt-10 space-y-5">
        <h4
          className="inline-block from-blue-700 to-pink-700 leading-[30px]
              bg-gradient-to-r bg-clip-text text-transparent text-[36.65px]"
        >
          Event binding on dynamically created elements?
        </h4>
        <p className="text-[14px] leading-[21px] text-[#BBBBBB]">
          I have a bit of code where I am looping through all the select boxes on a page and binding
          a .hover event to them to do a bit of twiddling with their width on mouse on/off. This
          happens on page
        </p>

        <div className="sm:hidden flex justify-start items-center space-x-2 text-[#56617B]">
          <BsCalendar3 size={20} />
          <span>Asked 3 months ago</span>
        </div>

        <div className="flex justify-between items-center text-[#BBBBBB]">
          <div className="flex items-center flex-wrap text-[14px]">
            <div className="hidden sm:flex justify-center items-center space-x-2 text-[#56617B] mr-3">
              <BsCalendar3 size={20} />
              <span>Asked 3 months ago</span>
            </div>

            <div className="flex items-center space-x-3 flex-wrap">
              <div
                className="flex space-x-1 border border-pink-500 h-[32px] w-[90px]
                  justify-center items-center rounded-md text-pink-500 cursor-pointer"
              >
                <FaEthereum className="w-[10px] h-[15px]" />
                <p>0.05 prize</p>
              </div>

              <Tags tags={['Ajax', 'Js']} />
              <TagsSm tags={['Ajax', 'Js']} />
            </div>
          </div>

          <div className="space-x-2 text-xs hidden sm:flex items-center">
            <Identicon className="h-6 rounded-full bg-slate-600" size={30} string="0x2c...3fe3" />
            <p>0x2c...3fe3</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3 text-[#BBBBBB] sm:hidden mt-5">
        <div className=" space-x-2 text-xs flex items-center">
          <Identicon className="h-6 rounded-full bg-slate-600" size={30} string="0x2c...3fe3" />
          <p>0x2c...3fe3</p>
        </div>
      </div>
    </>
  )
}
