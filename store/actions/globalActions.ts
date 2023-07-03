import { AnswerProp, GlobalState, QuestionProp } from '@/utils/interfaces'
import { PayloadAction } from '@reduxjs/toolkit'

export const globalActions = {
  setWallet: (state: GlobalState, action: PayloadAction<string>) => {
    state.wallet = action.payload
  },
  setAnswerModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.answerModal = action.payload
  },
  setQuestionModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.questionModal = action.payload
  },
  setQuestionUpdateModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.questionUpdateModal = action.payload
  },
  setQuestionDeleteModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.questionDeleteModal = action.payload
  },
  setQuestions: (state: GlobalState, action: PayloadAction<QuestionProp[]>) => {
    state.questions = action.payload
  },
  setQuestion: (state: GlobalState, action: PayloadAction<QuestionProp>) => {
    state.question = action.payload
  },
  setAnswers: (state: GlobalState, action: PayloadAction<AnswerProp[]>) => {
    state.answers = action.payload
  },
}
