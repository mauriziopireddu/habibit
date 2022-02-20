import {
  differenceInCalendarDays,
  isMonday,
  nextMonday,
  startOfMonth,
} from 'date-fns'

export const getOffsetFromFirstMonday = (date: Date): number => {
  const firstDayOfTheMonth = startOfMonth(date)
  if (isMonday(firstDayOfTheMonth)) {
    return 0
  }
  return (
    7 -
    differenceInCalendarDays(nextMonday(firstDayOfTheMonth), firstDayOfTheMonth)
  )
}

export const daysOfWeek = (locale = 'en-US') => {
  const { format } = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  return [...Array(7).keys()].map(day => format(new Date(2021, 5, day)))
}
