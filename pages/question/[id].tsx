import Head from 'next/head'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { BsFillTrophyFill } from 'react-icons/bs'
import Header from '@/components/Header'
import React from 'react'
import Details from '@/components/Details'
import { generateQuestions } from '@/utils/helper'
import { QuestionProp } from '@/utils/interfaces'

export default function Question({ question }: { question: QuestionProp }) {
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

          <Details question={question} />

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

export const getServerSideProps = async () => {
  const data = generateQuestions(1)
  return {
    props: { question: JSON.parse(JSON.stringify(data[0])) },
  }
}
