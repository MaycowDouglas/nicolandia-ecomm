import { useCart } from '@/hooks/useCart'
import useUser from '@/hooks/useUser'
import { classNames } from '@/lib/classNames'
import Logo from '@/public/images/brands/nicolandia-red.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiShoppingBag, FiShoppingCart, FiUser } from 'react-icons/fi'

import Cart from './Cart'
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
    <>
      <header className={`w-full fixed z-30`}>
        <div
          className={classNames(
            isVisible ? 'h-auto py-1' : 'h-0 p-0',
            'bg-slate-100 overflow-hidden transition-all'
          )}
        >
          <p className="text-center text-custom-600">
            <strong>Horário de funcionamento:</strong> Terça a Sexta de 14h15 às 20h e Sábados,
            Domingos e Feriados de 11h às 20h. Dia 31/12 parque fechado.
          </p>
        </div>
        <div className="py-2 shadow-lg bg-white ">
          <div className="container flex justify-between items-center">
            <Link href="/">
              <Image src={Logo} className="w-20 h-auto" alt="Nicolândia" />
            </Link>

            <div className="flex items-center gap-5 md:gap-10">
              <button
                title="Carrinho de compras"
                onClick={() => setShowCart(true)}
                className={classNames(
                  'group relative inline-flex p-5 rounded-full bg-slate-100 text-2xl transition-all',
                  'hover:bg-custom-100 hover:text-white'
                )}
              >
                <span
                  className={classNames(
                    'absolute top-0 right-0 w-5 h-5 inline-flex justify-center items-center bg-custom-100 rounded-full text-sm text-white  transition-all',
                    'group-hover:bg-white group-hover:text-custom-100'
                  )}
                >
                  {items.length}
                </span>
                <FiShoppingCart />
              </button>
              <Link
                href={user?.isLogged ? '/painel' : '/entrar'}
                title={user?.isLogged ? 'Minha conta' : 'Entrar ou cadastrar-se'}
                className="group flex items-center gap-5"
              >
                <span
                  className={classNames(
                    'p-5 inline-flex rounded-full bg-slate-100 text-2xl transition-all',
                    'group-hover:bg-custom-100 group-hover:text-white'
                  )}
                >
                  {user?.isLogged ? <FiShoppingBag /> : <FiUser />}
                </span>
                {user?.isLogged ? (
                  <span className="hidden md:inline-flex text-left">
                    Olá, {user.data?.name} <br />
                    Clique aqui e veja suas compras
                  </span>
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
      <div className="pt-32"></div>
      {showCart && <Cart onClick={() => setShowCart(false)} />}
    </>
  )
}
