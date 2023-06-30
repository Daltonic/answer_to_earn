import { QuestionProp, TruncateProps } from './interfaces'

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
      prize: Math.floor(Math.random() * 1000),
    }

    questions.push(question)
  }

  return questions
}

export function getTimeAgo(timestamp: number) {
  const currentTimestamp = Date.now()
  const secondsAgo = Math.floor((currentTimestamp - timestamp) / 1000)

  if (secondsAgo < 60) {
    return `${secondsAgo} second${secondsAgo === 1 ? '' : 's'} ago`
  }

  const minutesAgo = Math.floor(secondsAgo / 60)
  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`
  }

  const hoursAgo = Math.floor(minutesAgo / 60)
  if (hoursAgo < 24) {
    return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`
  }

  const daysAgo = Math.floor(hoursAgo / 24)
  if (daysAgo < 30) {
    return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`
  }

  const monthsAgo = Math.floor(daysAgo / 30)
  if (monthsAgo < 12) {
    return `${monthsAgo} month${monthsAgo === 1 ? '' : 's'} ago`
  }

  const yearsAgo = Math.floor(monthsAgo / 12)
  return `${yearsAgo} year${yearsAgo === 1 ? '' : 's'} ago`
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
