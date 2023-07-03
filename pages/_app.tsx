import '@/styles/global.css'
import { store } from '@/store'
import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { checkWallet } from '@/services/blockchain'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    checkWallet()
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Provider>
  )
}
