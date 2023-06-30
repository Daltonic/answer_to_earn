export interface TagsProps {
  tags: string[]
}

export interface TruncateProps {
  text: string
  startChars: number
  endChars: number
  maxLength: number
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
