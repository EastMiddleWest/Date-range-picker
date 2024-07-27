import { type PropsWithChildren} from 'react';

export type DateRangeValue = Date | undefined | null

export type RangeValue =  [DateRangeValue, DateRangeValue]

export type Props = {
  value: RangeValue;
  onChange: (value: Date) => void;
} & PropsWithChildren