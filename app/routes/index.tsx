import { add, getDaysInMonth, sub } from 'date-fns'
import { json, LoaderFunction, useLoaderData } from 'remix'
import languageParser from 'accept-language-parser'
import { daysOfWeek, getOffsetFromFirstMonday } from '~/utils/dates'
import { useState } from 'react'

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
  const [date, setDate] = useState(new Date())
  const onClick = () => {}
  const offset = getOffsetFromFirstMonday(date)

  return (
    <main>
      <section className="px-4">
        <div className="border-[1px] shadow-sm p-5 my-2">
          <h2 className="text-3xl text-center uppercase">
            {new Intl.DateTimeFormat(locale, {
              year: 'numeric',
              month: 'long',
            }).format(date)}
          </h2>
          <div className="text-center">
            <button
              type="button"
              aria-label="Go to previous month"
              className="text-2xl"
              onClick={() => setDate(sub(date, { months: 1 }))}
            >
              ⬅
            </button>
            <span className="mx-2 sp">|</span>
            <button
              type="button"
              aria-label="Go to next month"
              className="text-2xl"
              onClick={() => setDate(add(date, { months: 1 }))}
            >
              ➡️
            </button>
          </div>
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
                } aspect-square border-[1px] hover:bg-slate-100`}
              >
                <time
                  dateTime={new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    index + 1,
                  ).toLocaleDateString(locale)}
                >
                  {index + 1}
                </time>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
