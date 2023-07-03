import Head from 'next/head'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import Header from '@/components/Header'
import React, { useEffect } from 'react'
import Details from '@/components/Details'
import { AnswerProp, QuestionProp, RootState } from '@/utils/interfaces'
import Link from 'next/link'
import Answers from '@/components/Answers'
import { BiNetworkChart } from 'react-icons/bi'
import { BsFillTrophyFill } from 'react-icons/bs'
import AddComment from '@/components/AddComment'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/globalSlices'
import { getAnswers, getQuestion } from '@/services/blockchain'
import { GetServerSidePropsContext } from 'next'
import UpdateQuestion from '@/components/UpdateQuestion'
import DeleteQuestion from '@/components/DeleteQuestion'

export default function Question({
  questionData,
  answersData,
}: {
  questionData: QuestionProp
  answersData: AnswerProp[]
}) {
  const dispatch = useDispatch()
  const { setQuestion, setAnswers, setAnswerModal } = globalActions
  const { question, answers, wallet } = useSelector((states: RootState) => states.globalStates)

  useEffect(() => {
    dispatch(setQuestion(questionData))
    dispatch(setAnswers(answersData))

    if (wallet) {
      getAnswers(questionData.id).then((answersX) => {
        answersX.length > 0 && dispatch(setAnswers(answersX))
      })
    }
  }, [dispatch, questionData, answersData, setQuestion, setAnswers, wallet])

  return (
    <div>
      <Head>
        <title>Question</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen w-screen radial-gradient">
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

          {wallet && (
            <button
              className="text-sm bg-blue-600 rounded-full w-[150px] h-[48px] text-white
            right-2 sm:right-10 hover:bg-blue-700  transition-colors duration-300"
              onClick={() => dispatch(setAnswerModal('scale-100'))}
            >
              Add Answer
            </button>
          )}

          <div className="flex justify-between items-center font-bold text-sm text-[#BBBBBB] mt-6">
            <div className="flex space-x-2 items-center h-[24px]">
              <BiNetworkChart className="text-[#212D4A] w-[24px] h-[24px]" />
              <p>{answers.length} answer(s)</p>
            </div>
          </div>

          {answers.length > 0 ? (
            <Answers answers={answers} questionData={question} />
          ) : (
            <div className="flex flex-col mt-10 items-center space-y-4">
              <BsFillTrophyFill className="text-[#525F80]" size={40} />
              <p className="text-[#BBBBBB]">Be the first one to drop an answer.</p>
            </div>
          )}
        </div>
      </main>

      <AddComment questionData={question} />
      <UpdateQuestion questionData={question} />
      <DeleteQuestion questionData={question} />
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query
  const questionId = typeof id === 'string' ? parseInt(id, 10) : undefined
  if (typeof questionId !== 'number') {
    return {
      props: {
        error: 'Invalid question ID',
      },
    }
  }

  const questionData = await getQuestion(questionId)
  const answersData = await getAnswers(questionId)

  return {
    props: {
      questionData: JSON.parse(JSON.stringify(questionData)),
      answersData: JSON.parse(JSON.stringify(answersData)),
    },
  }
}
