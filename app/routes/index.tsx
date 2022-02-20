import { getDaysInMonth } from 'date-fns'
import { json, LoaderFunction, useLoaderData } from 'remix'
import languageParser from 'accept-language-parser'
import { daysOfWeek, getOffsetFromFirstMonday } from '~/utils/dates'

type LoaderData = { locale: string }

export let loader: LoaderFunction = async ({ request }) => {
  const acceptLanguage = request.headers.get('accept-language') as
    | string
    | undefined

  const languages = languageParser
    .parse(acceptLanguage)
    .filter(({ region }) => !!region)
    .map(({ code, region }) => `${code}-${region}`)

  const response: LoaderData = { locale: languages?.[0] || 'en-US' }
  return json(response)
}

export default function Index() {
  const { locale } = useLoaderData<LoaderData>()

  const onClick = () => {}
  const date = new Date()
  const offset = getOffsetFromFirstMonday(date)

  return (
    <main>
      <section className="px-4">
        <h2 className="text-3xl text-center uppercase">
          {new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
          }).format(date)}
        </h2>
        <div className="grid grid-cols-7 uppercase text-center my-2">
          {daysOfWeek(locale).map(day => (
            <div key={day} className="">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {[...Array(getDaysInMonth(date))].map((day, index) => (
            <button
              key={index}
              onClick={onClick}
              className={`first:col-start-${
                offset + 1
              } aspect-square border-[1px]`}
            >
              <time dateTime={`2022-02-${index}`}>{index + 1}</time>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
