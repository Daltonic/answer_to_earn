import Head from 'next/head'
import Header from '@/components/Header'
import Banner from '@/components/Banner'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-screen h-screen radial-gradient'>
        <Header />
        <Banner />
      </main>
    </div>
  )
}
