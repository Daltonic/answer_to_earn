import Head from 'next/head'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import Questions from '@/components/Questions'
import { QuestionProp, RootState } from '@/utils/interfaces'
import Empty from '@/components/Empty'
import AddQuestion from '@/components/AddQuestion'
import { getQuestions } from '@/services/blockchain'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/globalSlices'
import { useEffect } from 'react'

export default function Home({ questionsData }: { questionsData: QuestionProp[] }) {
  const dispatch = useDispatch()
  const { setQuestions } = globalActions
  const { questions } = useSelector((states: RootState) => states.globalStates)

  useEffect(() => {
    dispatch(setQuestions(questionsData))
  }, [dispatch, setQuestions, questionsData])

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen w-screen pb-20 radial-gradient">
        <Header />
        <Banner />
        {questions.length > 0 ? <Questions questions={questions} /> : <Empty />}
        <AddQuestion />
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const questionsData: QuestionProp[] = await getQuestions()
  return {
    props: { questionsData: JSON.parse(JSON.stringify(questionsData)) },
  }
}
