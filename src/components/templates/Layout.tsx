import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
