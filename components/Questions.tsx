import { truncate } from '@/utils/helper'
import { QuestionProp } from '@/utils/interfaces'
import Link from 'next/link'
import React from 'react'
import { FaEthereum } from 'react-icons/fa'
import Identicon from 'react-identicons'
import { Tags, TagsSm } from './Tags'
import Moment from 'react-moment'

const Questions: React.FC<{ questions: QuestionProp[] }> = ({ questions }) => {
  return (
    <div className="px-5 sm:px-10">
      {questions.map((question: QuestionProp, i: number) => (
        <Link href={'/question/' + question.id} key={i}>
          <div className="w-full border border-[#212D4A] p-5 text-[14px] text-[#BBBBBB] mt-12 sm:mt-10 rounded-xl space-y-5">
            <h4 className="text-[22.65px] leading-[30px]">{question.title}</h4>
            <p className=" leading-[21px]">{question.description}</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 flex-wrap ">
                {question.paidout ? (
                  <div
                    className="flex space-x-1 border border-green-400 h-[32px] w-[90px]
                  justify-center items-center rounded-md text-green-400 cursor-pointer"
                  >
                    <FaEthereum className="w-[10px] h-[15px]" />
                    <p>{question.prize} Paid</p>
                  </div>
                ) : (
                  <div
                    className="flex space-x-1 border border-pink-500 h-[32px] w-[90px]
                  justify-center items-center rounded-md text-pink-500 cursor-pointer"
                  >
                    <FaEthereum className="w-[10px] h-[15px]" />
                    <p>{question.prize} prize</p>
                  </div>
                )}

                <Tags tags={question.tags} />
                <TagsSm tags={question.tags} />

                <div className=" hidden sm:flex items-center gap-2">
                  <p className="">
                    {question.answers === 0 ? 'No answer yet' : `${question.answers} answer(s)`}
                  </p>
                  <p>/</p>
                  <Moment fromNow>{question.created}</Moment>
                </div>
              </div>

              <div className="space-x-2  hidden sm:flex items-center">
                <Identicon
                  className="h-6 rounded-full bg-slate-600"
                  size={30}
                  string={question.owner}
                />
                <p>
                  {truncate({ text: question.owner, startChars: 4, endChars: 4, maxLength: 11 })}
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 sm:hidden">
              <div className=" flex items-center gap-2">
                <p className="">
                  {question.answers === 0 ? 'No answer yet' : `${question.answers} answer(s)`}
                </p>
                <p>/</p>
                <Moment fromNow>{question.created}</Moment>
              </div>

              <div className=" space-x-2  flex items-center">
                <Identicon
                  className="h-6 rounded-full bg-slate-600"
                  size={30}
                  string={question.owner}
                />
                <p>
                  {truncate({ text: question.owner, startChars: 4, endChars: 4, maxLength: 11 })}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Questions
