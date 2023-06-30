import { truncate } from '@/utils/helper'
import { AnswerProp } from '@/utils/interfaces'
import React from 'react'
import { FaEthereum } from 'react-icons/fa'
import Identicon from 'react-identicons'
import Moment from 'react-moment'

const Answers: React.FC<{ answers: AnswerProp[] }> = ({ answers }) => {
  return (
    <div className="pb-10">
      {answers.map((answer: AnswerProp, i: number) => (
        <div
          key={i}
          className="w-full border border-[#212D4A] p-5 text-[14px]
        text-[#BBBBBB] mt-12 sm:mt-10 rounded-xl space-y-5"
        >
          <p className="text-[14px] leading-[21px]">{answer.comment}</p>

          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center">
              <div className="hidden sm:flex items-center mr-4">
                <Moment fromNow>{answer.created}</Moment>
              </div>
              <div className="flex items-center space-x-3 flex-wrap">
                <div
                  className="flex space-x-1 border border-[#FA8383] h-[32px] w-[90px]
                justify-center items-center rounded-full text-[#FA8383] cursor-pointer"
                >
                  <FaEthereum className="w-[10px] h-[15px]" />
                  <p>Pay Now</p>
                </div>
              </div>
            </div>

            <div className="space-x-2 hidden sm:flex items-center">
              <Identicon
                className="h-6 rounded-full bg-slate-600"
                size={30}
                string={answer.owner}
              />
              <p>{truncate({ text: answer.owner, startChars: 4, endChars: 4, maxLength: 11 })}</p>
            </div>
          </div>

          <div className="flex justify-between items-center space-y-3 sm:hidden">
            <div className="flex items-center">
              <Moment fromNow>{answer.created}</Moment>
            </div>

            <div className="space-x-2 flex items-center">
              <Identicon className="rounded-full bg-slate-600" size={30} string={answer.owner} />
              <p>{truncate({ text: answer.owner, startChars: 4, endChars: 4, maxLength: 11 })}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Answers
