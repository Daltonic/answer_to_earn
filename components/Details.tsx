import { BsCalendar3 } from 'react-icons/bs'
import { FaEthereum } from 'react-icons/fa'
import { Tags, TagsSm } from './Tags'
import Identicon from 'react-identicons'
import React from 'react'
import { QuestionProp } from '@/utils/interfaces'
import { truncate } from '@/utils/helper'
import Moment from 'react-moment'

const Details: React.FC<{ question: QuestionProp }> = ({ question }) => {
  const currentTime = Date.now()
  return (
    <>
      <div className="flex flex-col mt-10 space-y-5">
        <h4
          className="inline-block from-blue-700 to-pink-700 leading-[30px]
          bg-gradient-to-r bg-clip-text text-transparent text-[36.65px]"
        >
          {question.title}
        </h4>
        <p className="text-[14px] leading-[21px] text-[#BBBBBB]">{question.description}</p>

        <div className="sm:hidden flex justify-start items-center space-x-2 text-[#56617B]">
          <BsCalendar3 size={20} />
          <span>
            Asked <Moment fromNow>{question.created}</Moment>
          </span>
        </div>

        <div className="flex justify-between items-center text-[#BBBBBB]">
          <div className="flex items-center flex-wrap text-[14px]">
            <div className="hidden sm:flex justify-center items-center space-x-2 text-[#56617B] mr-3">
              <BsCalendar3 size={20} />
              <span>
                Asked <Moment fromNow>{question.created}</Moment>
              </span>
            </div>

            <div className="flex items-center space-x-3 flex-wrap">
              <div
                className="flex space-x-1 border border-pink-500 h-[32px] w-[90px]
                    justify-center items-center rounded-md text-pink-500 cursor-pointer"
              >
                <FaEthereum className="w-[10px] h-[15px]" />
                <p>{question.prize} prize</p>
              </div>

              <Tags tags={question.tags} />
              <TagsSm tags={question.tags} />
            </div>
          </div>

          <div className="space-x-2 text-xs hidden sm:flex items-center">
            <Identicon
              className="h-6 rounded-full bg-slate-600"
              size={30}
              string={question.owner}
            />
            <p>{truncate({ text: question.owner, startChars: 4, endChars: 4, maxLength: 11 })}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3 text-[#BBBBBB] sm:hidden mt-5">
        <div className=" space-x-2 text-xs flex items-center">
          <Identicon className="h-6 rounded-full bg-slate-600" size={30} string={question.owner} />
          <p>{truncate({ text: question.owner, startChars: 4, endChars: 4, maxLength: 11 })}</p>
        </div>
      </div>
    </>
  )
}

export default Details
