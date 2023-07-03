import { createAnswer } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { QuestionProp, RootState } from '@/utils/interfaces'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AddComment: React.FC<{ questionData: QuestionProp | null }> = ({ questionData }) => {
  const dispatch = useDispatch()
  const { setAnswerModal } = globalActions
  const { answerModal } = useSelector((states: RootState) => states.globalStates)
  const [answer, setAnswer] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!answer || !questionData?.id) return

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        createAnswer(questionData?.id, answer)
          .then((tx) => {
            closeModal()
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Approve transaction...',
        success: 'Answer created successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const closeModal = () => {
    dispatch(setAnswerModal('scale-0'))
    setAnswer('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${answerModal}`}
    >
      <div className="bg-[#16112F] text-[#BBBBBB] shadow-lg shadow-pink-500 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Answer the question</p>
            <button onClick={closeModal} className="border-0 bg-transparent focus:outline-none">
              <FaTimes />
            </button>
          </div>

          <form
            onClick={handleSubmit}
            className="flex flex-col justify-center items-start rounded-xl mt-5 mb-5"
          >
            <textarea
              className="h-[25vh] w-full bg-transparent border border-[#212D4A] rounded-xl py-3 px-3
              focus:outline-none focus:ring-0 resize-none"
              placeholder="Type your comment here..."
              value={answer}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)}
            />

            <button
              className="text-sm bg-blue-600 rounded-full w-[150px] h-[48px] text-white
            right-2 sm:right-10 hover:bg-blue-700 transition-colors duration-300 mt-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddComment
