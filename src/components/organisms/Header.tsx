import { useCart } from '@/hooks/useCart'
import useUser from '@/hooks/useUser'
import Logo from '@/public/images/brands/nicolandia-red.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiShoppingCart, FiUser } from 'react-icons/fi'

import Navbar from './Navbar'

export default function Header() {
  const { items } = useCart()
  const { user } = useUser()
  const [showCart, setShowCart] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 0 ? false : true)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header>
      <div className="py-2 shadow-lg">
        <div className="container flex justify-between items-center">
          <Link href="/">
            <Image src={Logo} className="w-20 h-auto" alt="Nicolândia" />
          </Link>

          <div className="flex items-center gap-5 md:gap-10">
            <button
              title="Carrinho de compras"
              onClick={() => setShowCart(true)}
              className="group relative inline-flex p-5 rounded-full bg-slate-100 text-2xl hover:bg-custom-100 hover:text-white transition-all"
            >
              <span className="absolute top-0 right-0 w-5 h-5 inline-flex justify-center items-center bg-custom-100 text-sm text-white rounded-full group-hover:bg-white group-hover:text-custom-100 transition-all">
                {items.length}
              </span>
              <FiShoppingCart />
            </button>
            <Link
              href={user?.isLogged ? '/minha-conta' : '/login'}
              title={user?.isLogged ? 'Minha conta' : 'Entrar ou cadastrar-se'}
              className="group flex items-center gap-5"
            >
              <span className="inline-flex p-5 rounded-full bg-slate-100 text-2xl group-hover:bg-custom-100 group-hover:text-white transition-all">
                <FiUser />
              </span>
              {user?.isLogged ? (
                <span className="hidden md:inline-flex text-left">Olá, {user.data?.name}</span>
              ) : (
                <span className="hidden md:inline-flex text-left">
                  Olá, entre ou cadastre-se <br />
                  para realizar as suas compras!
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  )
}
