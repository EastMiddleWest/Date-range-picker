import { type MutableRefObject} from 'react';
import { type RangeValue} from './types';

export const getStringValue = (range: RangeValue): string => {
  if(range[0] && range[1]){
    return range.map(value => value?.toLocaleDateString()).join(' - ')
  }
  return ''
}

export const getDropDownPosition = (parentRef: MutableRefObject<HTMLDivElement | null>) => {
  const coordinates = {top: 0, left: 0}
    if(parentRef.current){
      const {x, y, height} = parentRef.current.getBoundingClientRect()
      coordinates.left = x
      coordinates.top = y + height + 15
    }
    return coordinates
}

export const fillCalendarData = ( date: Date): Date[] => {
  const defaultDate = new Date(date.toISOString())
  defaultDate.setDate(1)
  const data = []
  let daysAmount = 34
  if(defaultDate.getMonth() === 1 && defaultDate.getDay() === 1) daysAmount = 27
  if(defaultDate.getFullYear()%4 === 0 && defaultDate.getMonth() === 1 && defaultDate.getDay() === 1) daysAmount = 28
  const lastDay = new Date(defaultDate.getFullYear(), defaultDate.getMonth(),31)
  let count = defaultDate.getDay() === 6 ?  -6 : 0-defaultDate.getDay()
  if((lastDay.getDate() === 31 && lastDay.getDay() === 1) || (count === -6 && defaultDate.getMonth() !== 1)) daysAmount = 41
  for(let i=0; i <= daysAmount; i++){
    const day = new Date(defaultDate.getFullYear(), defaultDate.getMonth(), 1+count)
    data.push(day)
    count++
  }
  return data
}
