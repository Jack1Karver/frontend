import Modal from '@/components/modal/modal'
import '@/resources/styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <><Component {...pageProps} />
  <Modal/></>
}
