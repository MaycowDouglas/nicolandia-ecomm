import AtractionArenaElastica from '@/public/images/atractions/arena-elastica.jpeg'
import AtractionCarrossel from '@/public/images/atractions/carrossel.jpg'
import AtractionColossusLoop from '@/public/images/atractions/colossus-loop.jpeg'
import AtractionCrazyDance from '@/public/images/atractions/crazy-dance.jpeg'
import AtractionDisko from '@/public/images/atractions/disko.jpg'
import AtractionFerrysWheel from '@/public/images/atractions/ferrys-wheel.jpg'
import AtractionGrandPrix from '@/public/images/atractions/grand-prix.jpg'
import AtractionKabum from '@/public/images/atractions/kabum.png'
import AtractionMagicCup from '@/public/images/atractions/magic-cup.jpg'
import AtractionMinhocao from '@/public/images/atractions/minhocao.jpeg'
import AtractionPescaria from '@/public/images/atractions/pescaria.jpeg'
import AtractionPirateShip from '@/public/images/atractions/pirate-ship.jpeg'
import AtractionReinoEncantado from '@/public/images/atractions/reino-encantado.jpg'
import AtractionRockRoll from '@/public/images/atractions/rock-roll.jpg'
import AtractionRollerCoaster from '@/public/images/atractions/roller-coaster.jpeg'
import AtractionSkyFlyer from '@/public/images/atractions/sky-flyer.jpeg'
import AtractionSpook from '@/public/images/atractions/spook.jpeg'
import AtractionSuperFrisbee from '@/public/images/atractions/super-frisbee.jpeg'
import AtractionTrex from '@/public/images/atractions/t-rex.jpeg'
import AtractionTiro from '@/public/images/atractions/tiro.jpeg'
import AtractionToboga from '@/public/images/atractions/toboga.jpg'
import AtractionTremCavalaria from '@/public/images/atractions/trem-cavalaria.jpg'
import AtractionTrenzinhoCircus from '@/public/images/atractions/trenzinho-circus.jpeg'
// import AtractionTrenzinhoEncantado from '@/public/images/atractions/trenzinho-encantado.jpeg'
import AtractionTrenzinhoFazenda from '@/public/images/atractions/trenzinho-fazenda.jpeg'
import AtractionTrenzinhoTour from '@/public/images/atractions/trenzinho-tour.jpeg'
import AtractionWaveBlaster from '@/public/images/atractions/wave-blaster.jpeg'
import AtractionZipZap from '@/public/images/atractions/zip-zap.jpg'
import { StaticImageData } from 'next/image'

export type AttractionProps = {
  name: string
  alert?: string
  image: StaticImageData
  category: 'radical' | 'familiar' | 'childish'
  observation?: string
  restrictions?: {
    minHeight?: number
    maxHeight?: number
    allowCompanion?: boolean
    minHeightWithCompanion?: number
  }
}

export const data: AttractionProps[] = [
  {
    name: 'Kabum',
    image: AtractionKabum,
    category: 'radical',
    observation:
      'Está atração não é permitida para quem possui mobilidade reduzida. Não recomendada para pessoas com problemas na coluna vertebral.',
    restrictions: {
      minHeight: 140,
    },
  },
  {
    name: 'Super frisbee',
    image: AtractionSuperFrisbee,
    category: 'radical',
    restrictions: {
      minHeight: 140,
    },
  },
  {
    name: 'Rock & Roll',
    image: AtractionRockRoll,
    category: 'radical',
    observation:
      'Para participar desta atração, você precisa ter mais flexibilidade na parte inferior. Esta atração não é recomendada para quem não possui nenhuma mobilidade nas pernas.',
    restrictions: {
      minHeight: 140,
    },
  },
  {
    name: 'Tobogã',
    image: AtractionToboga,
    category: 'radical',
    observation: 'Funcionamento nas sextas. Sábados, domingos e feriados à partir de 14h30',
    restrictions: {
      minHeight: 120,
    },
  },
  {
    name: 'Crazy Dance',
    image: AtractionCrazyDance,
    category: 'radical',
    restrictions: {
      minHeight: 120,
    },
  },
  {
    name: "Colossu's Loop",
    image: AtractionColossusLoop,
    category: 'radical',
    restrictions: {
      minHeight: 130,
    },
  },
  {
    name: 'Disko',
    image: AtractionDisko,
    category: 'radical',
    restrictions: {
      minHeight: 130,
    },
  },
  {
    name: 'Sky flyer',
    image: AtractionSkyFlyer,
    category: 'radical',
    restrictions: {
      minHeight: 130,
    },
  },
  {
    name: 'Roller Coaster',
    image: AtractionRollerCoaster,
    category: 'radical',
    restrictions: {
      minHeight: 130,
    },
  },
  {
    name: 'Minhocão',
    image: AtractionMinhocao,
    category: 'radical',
    restrictions: {
      minHeight: 130,
    },
  },
  {
    name: 'Pirate Ship',
    image: AtractionPirateShip,
    category: 'familiar',
    restrictions: {
      minHeight: 110,
    },
  },
  {
    name: 'Spook',
    image: AtractionSpook,
    category: 'familiar',
    restrictions: {
      minHeight: 140,
    },
  },
  {
    name: 'Wave Blaster',
    image: AtractionWaveBlaster,
    category: 'familiar',
    observation: 'Crianças de 1.20 metros até 1.30 metros tem direito a acompanhante',
  },
  {
    name: 'Reino Encantado',
    image: AtractionReinoEncantado,
    category: 'familiar',
    restrictions: {
      maxHeight: 140,
      allowCompanion: true,
    },
  },
  {
    name: 'Ferris Wheel',
    image: AtractionFerrysWheel,
    category: 'familiar',
    observation:
      'Temos uma cabine adaptada para pessoas cadeirantes, permitindo apenas um acompanhante.',
    restrictions: {
      maxHeight: 130,
    },
  },
  {
    name: 'Grand Prix',
    image: AtractionGrandPrix,
    category: 'familiar',
    observation:
      'Crianças com altura de 0.80cm até 1.30 metros, tem direito a acompanhante. Para participar desta atração, você precisa ter mais flexibilidade na parte inferior, por ser um brinquedo que sofre impactos. Lembrando que será necessário um acompanhante para estar pressionando o pedal de aceleração.',
  },
  {
    name: 'Tiro',
    alert: 'R$ 20,00 por pessoa, 15 tiros',
    image: AtractionTiro,
    category: 'familiar',
    observation: 'Essa atração não faz parte do passaporte. Compra presencialmente no parque',
  },
  {
    name: 'Trenzinho Tour',
    alert: 'R$ 20,00 por pessoa',
    image: AtractionTrenzinhoTour,
    category: 'familiar',
    observation: 'Essa atração não faz parte do passaporte. Compra presencialmente no parque',
    restrictions: {
      allowCompanion: true,
    },
  },
  {
    name: 'Pescaria',
    alert: 'R$ 20,00 por pessoa',
    image: AtractionPescaria,
    category: 'childish',
    observation: 'Essa atração não faz parte do passaporte. Compra presencialmente no parque',
  },
  {
    name: 'Carrousel',
    image: AtractionCarrossel,
    category: 'childish',
    restrictions: {
      maxHeight: 140,
    },
  },
  {
    name: 'T-rex',
    image: AtractionTrex,
    category: 'childish',
    restrictions: {
      minHeight: 80,
    },
  },
  {
    name: 'Arena Elástica',
    image: AtractionArenaElastica,
    category: 'childish',
    restrictions: {
      maxHeight: 140,
    },
  },
  {
    name: 'Trem Cavalaria',
    image: AtractionTremCavalaria,
    category: 'childish',
    restrictions: {
      minHeight: 80,
      maxHeight: 130,
    },
  },
  {
    name: 'Trenzinho Circus',
    image: AtractionTrenzinhoCircus,
    category: 'childish',
    restrictions: {
      minHeight: 80,
      maxHeight: 130,
    },
  },
  // {
  //   name: 'Trenzinho Encantado',
  //   image: AtractionTrenzinhoEncantado,
  //   category: 'radical',
  //   restrictions: {
  //     minHeight: 80,
  //     maxHeight: 130,
  //   },
  // },
  {
    name: 'Trenzinho Fazenda',
    image: AtractionTrenzinhoFazenda,
    category: 'childish',
    observation: '',
    restrictions: {
      minHeight: 80,
      maxHeight: 130,
    },
  },
  {
    name: 'Trenzinho Circus',
    image: AtractionTrenzinhoCircus,
    category: 'childish',
    restrictions: {
      minHeight: 80,
      maxHeight: 130,
    },
  },
  {
    name: 'Zip zap',
    image: AtractionZipZap,
    category: 'childish',
    restrictions: {
      minHeight: 80,
      maxHeight: 130,
    },
  },
  {
    name: 'Magic Cup',
    image: AtractionMagicCup,
    category: 'childish',
    restrictions: {
      minHeight: 80,
      maxHeight: 130,
      allowCompanion: true,
    },
  },
]
