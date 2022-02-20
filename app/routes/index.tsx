// const weeksInCurrentMonth = 5
const daysInCurrentMonth = 28
const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export default function Index() {
  const onClick = () => {}
  return (
    <main>
      <section className="px-4">
        <h2 className="text-3xl uppercase">February 2022</h2>
        <div className="grid grid-cols-7 uppercase text-center my-2">
          {daysOfWeek.map(day => (
            <div key={day} className="">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {[...Array(daysInCurrentMonth)].map((day, index) => (
            <button
              key={index}
              onClick={onClick}
              className="first:col-start-2 aspect-square border-[1px]"
            >
              <time dateTime={`2019-02-${index}`}>{index + 1}</time>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
