import { AppProps } from 'next/app'
import '@/styles/global.css'
import DeleteQuestion from '@/components/DeleteQuestion'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <DeleteQuestion />
    </>
  )
}
