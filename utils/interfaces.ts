export interface TagsProps {
  tags: string[]
}

export interface TruncateProps {
  text: string
  startChars: number
  endChars: number
  maxLength: number
}

export interface AnswerProp {
  id: number
  qid: number
  comment: string
  owner: string
  deleted: boolean
  created: number
}

export interface QuestionProp {
  id: number
  title: string
  description: string
  owner: string
  winner: string
  paidout: boolean
  deleted: boolean
  updated: number
  created: number
  answers: number
  tags: string[]
  prize: number
}
