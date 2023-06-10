import NavbarLink from '@/components/atoms/NavbarLink'
import { BsClock, BsFillTriangleFill, BsRocketTakeoff } from 'react-icons/bs'
import { FiDownload, FiInfo } from 'react-icons/fi'
import { GiTicket } from 'react-icons/gi'

export default function Navbar() {
  return (
    <nav className="bg-custom-100 text-white">
      <div className="container grid grid-cols-4 text-xl text-center">
        <NavbarLink to="/atracoes">
          <BsRocketTakeoff />
          <span className="hidden md:inline text-sm">Atrações</span>
        </NavbarLink>
        <NavbarLink to="/passaportes">
          <GiTicket />
          <span className="hidden md:inline text-sm">Passaportes</span>
        </NavbarLink>
        <NavbarLink to="/faq">
          <FiInfo />
          <span className="hidden md:inline text-sm">Dúvidas frequentes</span>
        </NavbarLink>
        <NavbarLink to="/#app">
          <FiDownload /> <span className="hidden md:inline text-sm">Baixe o APP</span>
        </NavbarLink>
        <button className="hidden md-block relative group py-1 bg-custom-100 hover:saturate-[.75]">
          <span className="inline-flex items-center gap-2">
            <BsClock /> Horário de funcionamento
          </span>

          <BsFillTriangleFill className="hidden group-hover:block shadow-xl absolute top-10 left-1/2 -translate-x-1/2 text-slate-50" />
          <div className="hidden group-hover:block absolute px-5 py-5 top-12 left-0 right-0 bg-slate-50 rounded text-black shadow-xl">
            <ul>
              <li>Sexta de 15h15 às 21h,</li>
              <li>Sábados, Domingos e Feriados de 11h às 20h.</li>
            </ul>
          </div>
        </button>
      </div>
    </nav>
  )
}
