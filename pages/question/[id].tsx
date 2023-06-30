import Head from 'next/head'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import Header from '@/components/Header'
import React from 'react'
import Details from '@/components/Details'
import { generateAnswers, generateQuestions } from '@/utils/helper'
import { AnswerProp, QuestionProp } from '@/utils/interfaces'
import Link from 'next/link'
import Answers from '@/components/Answers'
import { BiNetworkChart } from 'react-icons/bi'
import { BsFillTrophyFill } from 'react-icons/bs'
import AddComment from '@/components/AddComment'

export default function Question({
  question,
  answers,
}: {
  question: QuestionProp
  answers: AnswerProp[]
}) {
  return (
    <div>
      <Head>
        <title>Question</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen radial-gradient">
        <Header />

        <div className="mt-16 sm:mt-9 px-3 sm:px-10">
          <Link
            href="/"
            className="flex justify-center items-center text-sm rounded-full
          w-[100px] h-[48px] right-2 sm:right-10 border border-[#212D4A] 
          transition-colors duration-300 space-x-2 hover:border-white"
          >
            <MdOutlineArrowBackIosNew className="text-[#91A7F3]" />
            <span className="text-white text-[14px]">Back</span>
          </Link>

          <Details question={question} />

          <hr className="bottom border-[#212D4A] w-full my-7" />

          <button
            className="text-sm bg-blue-600 rounded-full w-[150px] h-[48px] text-white
            right-2 sm:right-10 hover:bg-blue-700  transition-colors duration-300"
          >
            Add Answer
          </button>

          <div className="flex justify-between items-center font-bold text-sm text-[#BBBBBB] mt-6">
            <div className="flex space-x-2 items-center h-[24px]">
              <BiNetworkChart className="text-[#212D4A] w-[24px] h-[24px]" />
              <p>{answers.length} answer(s)</p>
            </div>
          </div>

          {answers.length > 0 ? (
            <Answers answers={answers} />
          ) : (
            <div className="flex flex-col mt-10 items-center space-y-4">
              <BsFillTrophyFill className="text-[#525F80]" size={40} />
              <p className="text-[#BBBBBB]">Be the first one to drop an answer.</p>
            </div>
          )}

          <AddComment />
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const questionData = generateQuestions(1)
  const answersData = generateAnswers(4)

  return {
    props: {
      question: JSON.parse(JSON.stringify(questionData[0])),
      answers: JSON.parse(JSON.stringify(answersData)),
    },
  }
}
