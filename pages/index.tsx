import Head from 'next/head'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import Questions from '@/components/Questions'
import { generateQuestions } from '@/utils/helper'
import { QuestionProp } from '@/utils/interfaces'
import Empty from '@/components/Empty'
import AddQuestion from '@/components/AddQuestion'

export default function Home({ questions }: { questions: QuestionProp[] }) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen pb-20 radial-gradient">
        <Header />
        <Banner />
        {questions.length > 0 ? <Questions questions={questions} /> : <Empty />}
        <AddQuestion />
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const data = generateQuestions(4)
  return {
    props: { questions: JSON.parse(JSON.stringify(data)) },
  }
}
