import { AnswerProp, QuestionProp, TruncateProps } from './interfaces'

export function generateRandomTags(count: number): string[] {
  const tags = ['Vue', 'Angular', 'React', 'Ajax', 'CSS', 'HTML']
  const generatedTags: string[] = []

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * tags.length)
    const randomTag = tags[randomIndex]
    generatedTags.push(randomTag)
  }

  return generatedTags
}

export function generateQuestions(count: number): QuestionProp[] {
  const questions: QuestionProp[] = []

  for (let i = 1; i <= count; i++) {
    const question: QuestionProp = {
      id: i,
      title: `Question ${i}`,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Assumenda possimus fuga delectus, odit recusandae saepe odio! Dolor dolore,
      illum repellat aperiam quo architecto dignissimos quam quis veritatis, harum neque nobis. ${i}`,
      owner: '0x1234567890123456789012345678901234567890', // Valid Ethereum address
      winner: '0x0987654321098765432109876543210987654321', // Valid Ethereum address
      paidout: false,
      deleted: false,
      updated: Date.now(),
      created: Date.now(),
      answers: Math.floor(Math.random() * 10),
      tags: generateRandomTags(3), // Generate 3 random tags
      prize: Math.floor(Math.random() * 1000).toString(),
    }

    questions.push(question)
  }

  return questions
}

export function generateAnswers(count: number): AnswerProp[] {
  const answers: AnswerProp[] = []

  for (let i = 1; i <= count; i++) {
    const answer: AnswerProp = {
      id: i,
      qid: i,
      comment: `Ipsum dolor sit amet consectetur adipisicing elit.
      Assumenda possimus fuga delectus, odit recusandae saepe odio! ${i}`,
      owner: '0x1234567890123456789012345678901234567890',
      deleted: false,
      updated: Date.now(),
      created: Date.now(),
    }

    answers.push(answer)
  }

  return answers
}

export function truncate({ text, startChars, endChars, maxLength }: TruncateProps): string {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}
