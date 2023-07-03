import Image from 'next/image'
import logo from '@/assets/images/Union.png'
import { AiOutlineSearch } from 'react-icons/ai'
import React from 'react'
import Link from 'next/link'
import { RootState } from '@/utils/interfaces'
import { useSelector } from 'react-redux'
import { truncate } from '@/utils/helper'
import { connectWallet } from '@/services/blockchain'

const Header: React.FC = () => {
  const { wallet } = useSelector((states: RootState) => states.globalStates)

  return (
    <div className="">
      <header
        className="border-b border-[#212D4A] h-[80px] w-full flex
      justify-between items-center relative mb-2 px-3 sm:px-10"
      >
        <Link href="/">
          <Image width="60" height="32" src={logo} alt="logo" className="ml-2 sm:ml-0" />
        </Link>

        <div
          className="h-[48px] w-[601px] border border-[#212D4A]
        rounded-full space-x-2 px-1 md:flex hidden items-center"
        >
          <div className="bg-[#1B1631] rounded-full p-3">
            <AiOutlineSearch className="text-[#455887]" />
          </div>

          <input
            placeholder="Search here"
            className="bg-transparent -mt-1 outline-none text-[14px] placeholder:text-xs
          placeholder:text-[#BBBBBB]"
          />
        </div>

        {wallet ? (
          <button
            className="text-sm bg-blue-600 rounded-full w-[150px] h-[48px] text-white
        right-2 sm:right-10 hover:bg-blue-700  transition-colors duration-300"
          >
            {truncate({ text: wallet, startChars: 4, endChars: 4, maxLength: 11 })}
          </button>
        ) : (
          <button
            className="text-sm bg-blue-600 rounded-full w-[150px] h-[48px] text-white
          right-2 sm:right-10 hover:bg-blue-700  transition-colors duration-300"
            onClick={connectWallet}
          >
            Connect wallet
          </button>
        )}
      </header>

      <div
        className="h-[48px] w-[90%] border border-[#212D4A] mx-auto
        rounded-full space-x-2 md:hidden px-1 flex items-center"
      >
        <div className="bg-[#1B1631] rounded-full p-3">
          <AiOutlineSearch className="text-[#455887]" />
        </div>

        <input
          placeholder="Search here"
          className="bg-transparent -mt-1 outline-none text-[14px] placeholder:text-xs
          placeholder:text-[#BBBBBB]"
        />
      </div>
    </div>
  )
}

export default Header
