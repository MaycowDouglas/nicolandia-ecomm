import { AttractionProps } from '@/lib/attractions'
import { classNames } from '@/lib/classNames'
import CategoryChildish from '@/public/images/childish.png'
import CategoryFamiliar from '@/public/images/familiar.png'
import CategoryRadical from '@/public/images/radical.png'
import Image from 'next/image'

type HideOption = {
  hideDetails?: boolean
}

export default function Attraction({
  name,
  alert,
  image,
  category,
  hideDetails = false,
  observation,
  restrictions,
}: AttractionProps & HideOption) {
  const categories = {
    radical: CategoryRadical,
    familiar: CategoryFamiliar,
    childish: CategoryChildish,
  }
  return (
    <article className="relative text-center rounded-lg bg-custom-200 p-5 pb-8 shadow-xl">
      <span
        className={classNames(
          'z-10 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'p-3 bg-white rounded-full shadow-2xl'
        )}
      >
        <Image width={60} height={60} src={categories[category]} alt="" />
      </span>
      <header className="relative h-56">
        <Image className="object-center object-cover rounded-lg" src={image} alt={name} fill />
      </header>
      <section className="text-white">
        <h3 className="mt-4 text-lg font-bold uppercase">{name}</h3>
        <div className={hideDetails ? 'hidden' : ''}>
          {restrictions && (
            <div className="mt-4">
              <h4 className="font-bold">Restrições</h4>
              {restrictions.minHeight && (
                <p className="">Altura mínima: {restrictions.minHeight / 100} metros</p>
              )}
              {restrictions.maxHeight && (
                <p className="">Altura mínima: {restrictions.maxHeight / 100} metros</p>
              )}
              {restrictions.allowCompanion && <p>Permite acompanhante adulto</p>}
            </div>
          )}

          {observation && (
            <div className="mt-4">
              <h4 className="font-bold">Observação</h4>
              <p className="text-sm">{observation}</p>
            </div>
          )}

          {alert && <p className="mt-4 font-bold text-custom-100">{alert}</p>}
        </div>
      </section>
    </article>
  )
}
