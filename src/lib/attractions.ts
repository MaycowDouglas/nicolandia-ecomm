import Atraction360 from '@/public/images/atractions/360.png'
// import AtractionArenaElastica from '@/public/images/atractions/arena-elastica.jpeg'
import AtractionBrinquedao from '@/public/images/atractions/brinquedao.png'
// import AtractionCarrossel from '@/public/images/atractions/carrossel.jpg'
import AtractionColossusLoop from '@/public/images/atractions/colossus-loop.jpeg'
import AtractionCrazyDance from '@/public/images/atractions/crazy-dance.jpg'
// import AtractionDisko from '@/public/images/atractions/disko.jpg'
// import AtractionDropZone from '@/public/images/atractions/drop-zone.png'
import AtractionFamilySwing from '@/public/images/atractions/family-swing.png'
import AtractionFerrysWheel from '@/public/images/atractions/wheel.jpg'
import AtractionGrandPrix from '@/public/images/atractions/grand-prix.png'
import AtractionKabum from '@/public/images/atractions/kabum.png'
import AtractionMagicCup from '@/public/images/atractions/magic-cup.jpg'
import AtractionMinhocao from '@/public/images/atractions/minhocao.png'
import AtractionMiniRoda from '@/public/images/atractions/mini-roda.png'
import AtractionMiniTorre from '@/public/images/atractions/mini-torre.png'
import AtractionPescaria from '@/public/images/atractions/pescaria.jpeg'
import AtractionPirateShip from '@/public/images/atractions/pirate-ship.jpeg'
import AtractionReinoEncantado from '@/public/images/atractions/reino-encantado.png'
import AtractionRockRoll from '@/public/images/atractions/rock-roll.jpg'
// import AtractionRollerCoaster from '@/public/images/atractions/roller-coaster.png'
import AtractionSpook from '@/public/images/atractions/spook.jpeg'
import AtractionSuperFrisbee from '@/public/images/atractions/super-frisbee.jpeg'
import AtractionTrex from '@/public/images/atractions/t-rex.jpeg'
import AtractionTiro from '@/public/images/atractions/tiro.jpeg'
import AtractionToboga from '@/public/images/atractions/toboga-noite.jpeg'
import AtractionTremCavalaria from '@/public/images/atractions/trem-cavalaria.png'
import AtractionTrenzinhoCircus from '@/public/images/atractions/trenzinho-circus.jpeg'
import AtractionTrenzinhoEncantado from '@/public/images/atractions/trenzinho-encantado.png'
import AtractionTrenzinhoFazenda from '@/public/images/atractions/trenzinho-fazenda.jpeg'
import AtractionTrenzinhoMiniBruc from '@/public/images/atractions/trenzinho-mini-bruc.png'
import AtractionTrenzinho from '@/public/images/atractions/trenzinho.jpg'
// import AtractionTrenzinhoTour from '@/public/images/atractions/trenzinho-tour.jpeg'
import AtractionWaveBlaster from '@/public/images/atractions/wave-blaster.png'
import AtractionZipZap from '@/public/images/atractions/zip-zap.jpg'
import { StaticImageData } from 'next/image'

export type AttractionProps = {
  name: string
  alert?: string
  shortDesc?: string
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
    name: '360',
    image: Atraction360,
    category: 'radical',
    shortDesc: 'O único da América Latina',
    observation:
      'Esta atração não é aconselhável para pessoas com problemas de saúde como labirintite, epilepsia. E também para portadores de disfunção motora e mental.',
    restrictions: {
      minHeight: 140,
    },
  },
  {
    name: 'Kabum',
    category: 'radical',
    image: AtractionKabum,
    shortDesc: 'Queda Livre de 30 metros',
    observation:
      'Está atração não é permitida para quem possui mobilidade reduzida. Não recomendada para pessoas com problemas na coluna vertebral. Funcionamento nos sábados, domingos e feriados: 11H às 12H. Retorno às 15H.',
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
    name: 'Super frisbee',
    image: AtractionSuperFrisbee,
    category: 'radical',
    observation: 'Temporariamente em manutenção',
    restrictions: {
      minHeight: 140,
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
  // {
  //   name: 'Drop Zone',
  //   image: AtractionDropZone,
  //   category: 'radical',
  //   observation: 'Está atração não é permitida para quem possui mobilidade reduzida.',
  //   restrictions: {
  //     minHeight: 120,
  //   },
  // },
  {
    name: 'Tobogã',
    image: AtractionToboga,
    category: 'familiar',
    observation: 'Funcionamento nos sábados, domingos e feriados: 11h às 12h. Retorno às 14h30.',
    restrictions: {
      minHeight: 120,
    },
  },
  // {
  //   name: 'Disko',
  //   image: AtractionDisko,
  //   category: 'radical',
  //   restrictions: {
  //     minHeight: 130,
  //   },
  // },
  // {
  //   name: 'Sky flyer',
  //   image: AtractionSkyFlyer,
  //   category: 'radical',
  //   restrictions: {
  //     minHeight: 130,
  //   },
  // },
  // {
  //   name: 'Roller Coaster',
  //   image: AtractionRollerCoaster,
  //   category: 'radical',
  //   restrictions: {
  //     minHeight: 130,
  //   },
  // },
  {
    name: 'Centopéia',
    image: AtractionMinhocao,
    category: 'familiar',
    restrictions: {
      minHeight: 80,
    },
  },
  {
    name: 'Family Swing',
    image: AtractionFamilySwing,
    category: 'familiar',
    restrictions: {
      minHeight: 120,
    },
  },

  {
    name: 'Wave Blaster',
    image: AtractionWaveBlaster,
    category: 'familiar',
    observation: 'Crianças de 1.20 metros até 1.30 metros tem direito a acompanhante',
  },
  // {
  //   name: 'Mini Roda',
  //   image: AtractionMiniRoda,
  //   category: 'familiar',
  //   restrictions: {
  //     minHeight: 80,
  //   },
  //   observation:
  //     'Visitantes com estatura entre 0,80M e 1,10M somente acompanhado por um adulto responsável. Visitantes com altura superior a 1,95m e/ou peso superir a 120kg não devem usufruir desta atração.',
  // },
  {
    name: 'Pirate Ship',
    image: AtractionPirateShip,
    category: 'familiar',
    restrictions: {
      minHeight: 110,
    },
    observation: 'Visitantes com estatura entre 1,10M e 1,20M é permitido um acompanhante',
  },
  {
    name: 'Spook',
    image: AtractionSpook,
    category: 'familiar',
    restrictions: {
      minHeight: 80,
      maxHeight: 130,
    },
    observation:
      'Visitantes com estatura entre 0,80M e 1,30M é permitido um acompanhante. Carga máxima por carro: 120Kg.',
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
    shortDesc: '40 metros de altura',
    image: AtractionFerrysWheel,
    category: 'familiar',
    observation:
      'Visitantes com até 1,30M devem ser acompanhados por um responsável adulto. Temos uma cabine adaptada para pessoas cadeirantes, permitindo apenas um acompanhante. Esta atração não é recomendada para pessoas com enjôo repentino, medo de altura e claustrofobia.',
    restrictions: {
      minHeight: 110,
    },
  },
  {
    name: 'Grand Prix',
    image: AtractionGrandPrix,
    category: 'familiar',
    observation:
      'Crianças com altura de 0.80cm até 1.20 metros, tem direito a acompanhante. Para participar desta atração, você precisa ter mais flexibilidade na parte inferior, por ser um brinquedo que sofre impactos. Lembrando que será necessário um acompanhante para estar pressionando o pedal de aceleração.',
  },
  {
    name: 'Tiro',
    alert: 'R$ 20,00 por pessoa, 15 tiros',
    image: AtractionTiro,
    category: 'familiar',
    observation: 'Essa atração não faz parte do passaporte. Compra presencialmente no parque',
  },
  // {
  //   name: 'Trenzinho Tour',
  //   alert: 'R$ 10,00 por pessoa',
  //   image: AtractionTrenzinhoTour,
  //   category: 'familiar',
  //   observation: 'Essa atração não faz parte do passaporte. Compra presencialmente no parque',
  //   restrictions: {
  //     allowCompanion: true,
  //   },
  // },
  {
    name: 'Trenzinho',
    alert: 'R$ 20,00 sendo 1 adulto e 1 criança.',
    image: AtractionTrenzinho,
    category: 'familiar',
    observation: 'Essa atração não faz parte do passaporte. Compra presencialmente no parque',
  },
  {
    name: 'Pescaria',
    alert: 'R$ 20,00 por pessoa',
    image: AtractionPescaria,
    category: 'childish',
    observation: 'Essa atração não faz parte do passaporte. Compra presencialmente no parque',
  },
  {
    name: 'Brinquedão',
    alert: 'Crianças com até 4 anos, o uso de fralda descartável é obrigatório.',
    image: AtractionBrinquedao,
    category: 'childish',
    observation: 'Essa atração não faz parte do passaporte. Compra presencialmente no parque.',
  },
  {
    name: 'Trenzinho Mini Bruco',
    image: AtractionTrenzinhoMiniBruc,
    category: 'childish',
    restrictions: {
      minHeight: 80,
      maxHeight: 130,
    },
  },
  {
    name: 'Mini Torre',
    image: AtractionMiniTorre,
    category: 'childish',
    restrictions: {
      minHeight: 80,
      maxHeight: 140,
    },
  },
  // {
  //   name: 'Carrossel',
  //   image: AtractionCarrossel,
  //   category: 'childish',
  //   restrictions: {
  //     maxHeight: 140,
  //   },
  // },
  {
    name: 'T-rex',
    image: AtractionTrex,
    category: 'childish',
    restrictions: {
      minHeight: 80,
    },
  },
  // {
  //   name: 'Arena Elástica',
  //   image: AtractionArenaElastica,
  //   category: 'childish',
  //   restrictions: {
  //     maxHeight: 140,
  //   },
  // },
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
    name: 'Trenzinho Encantado',
    image: AtractionTrenzinhoEncantado,
    category: 'childish',
    restrictions: {
      minHeight: 80,
      maxHeight: 130,
    },
  },
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
