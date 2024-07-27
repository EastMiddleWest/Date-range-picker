import React from 'react'
import styles from './Calendar.module.css';

import classNames from 'classnames';

import { fillCalendarData } from '../utils';
import { RangeValue } from '../types';

const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

type Props = {
  range: RangeValue;
  onChange: (date: Date) => void
}

const Calendar = ({range, onChange}: Props) => {

  const [defaultDate, setDefaultDate] = React.useState<Date>(range[0] || new Date())

  const toggleMonth = (isNextMonth: boolean) => {
    const currentDate = new Date(defaultDate)
    const currentMonth = currentDate.getMonth()
    if(isNextMonth) currentDate.setMonth(currentMonth+1)
    else currentDate.setMonth(currentMonth-1)
    setDefaultDate(currentDate)
  }

  const data = fillCalendarData(defaultDate)

  const dateClname = (date: Date) => {
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    const isCurrentMonth = date.getMonth() === defaultDate.getMonth()
    const isFirstSelected = date.toDateString() === range[0]?.toDateString()
    const isLastSelected = date.toDateString() === range[1]?.toDateString()
    const isSingleSelected =
      (date.toDateString() === range[0]?.toDateString() && !range[1])
      || (range[0] && range[1] && range[0].toDateString() === range[1].toDateString() && range[0].toDateString() === date.toDateString())
    const isInSelectedRange = !!range[0] && !!range[1] && date > range[0] && date < range[1]
    return classNames(styles.date,{
    [styles.today]: isToday,
    [styles['another_month']]: !isCurrentMonth,
    [styles['first-selected']]: isFirstSelected && !isSingleSelected,
    [styles['last-selected']]: isLastSelected && !isSingleSelected,
    [styles['single-selected']]: isSingleSelected,
    [styles['in_range']]: isInSelectedRange
  })}

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.control}>
          <span>{`${monthes[defaultDate.getMonth()]} ${defaultDate.getFullYear()}`}</span>
          <div>
            <button onClick={() => toggleMonth(false)}>prev</button>
            <button onClick={() => toggleMonth(true)}>next</button>
          </div>
        </div>
        <div className={styles.days}>
          {days.map(day =>
            <span key={day}>
              {day}
            </span>
            )}
        </div>
      </div>
      <div className={styles.calendar}>
        {data.map(day =>
          <div key={day.toString()} className={dateClname(day)} onClick={() => onChange(day)}>
            {day.getDate()}
          </div>
          )}
      </div>
    </div>
  )
}

export default Calendar