import { Menu } from '@headlessui/react'
import { FiEdit } from 'react-icons/fi'
import { BsTrash3 } from 'react-icons/bs'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import React from 'react'
import { useDispatch } from 'react-redux'
import { globalActions } from '@/store/globalSlices'

const QuestionAction: React.FC = () => {
  const dispatch = useDispatch()
  const { setQuestionUpdateModal, setQuestionDeleteModal } = globalActions

  return (
    <Menu as="div" className="inline-block text-left text-[#BBBBBB]">
      <Menu.Button
        className="inline-flex w-full justify-center
          rounded-md bg-[#16112E] bg-opacity-50 p-4 text-sm
          font-medium hover:bg-opacity-30 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white
          focus-visible:ring-opacity-75"
      >
        <BiDotsVerticalRounded size={17} />
      </Menu.Button>
      <Menu.Items
        className="absolute right-0 mr-2 mt-2 w-56 origin-top-right
          divide-y divide-[#BBBBBB] rounded-md bg-[#16112E] shadow-md 
          ing-1 ring-black ring-opacity-5 focus:outline-none shadow-pink-500 "
      >
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-[#0D0B15] text-[#BBBBBB]' : 'text-[#BBBBBB]'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              onClick={() => dispatch(setQuestionUpdateModal('scale-100'))}
            >
              <FiEdit size={17} />
              <span>Edit</span>
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-red-500' : 'text-red-500'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              onClick={() => dispatch(setQuestionDeleteModal('scale-100'))}
            >
              <BsTrash3 size={17} />
              <span>Delete</span>
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

export default QuestionAction
