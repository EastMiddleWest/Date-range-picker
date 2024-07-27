import React from 'react'
import styles from './DateRangePicker.module.css';

import { type Props } from './types';
import { getStringValue } from './utils';

import classNames from 'classnames';

import Portal from './Portal/Portal';
import Calendar from './Calendar/Calendar';

const DateRangePicker = ({ value, onChange, children }: Props) => {

  const ref = React.useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = React.useState(false)

  const dropdownClname = classNames(styles.dropdown, {
    [styles['dropdown-opened']]: isOpen,
  })

  return (
    <div className={styles.wrapper} ref={ref}>
      <input
        className={styles.input}
        type='text'
        value={getStringValue(value)}
        readOnly
        onFocus={() => setIsOpen(true)}
      />
      {isOpen &&
      <Portal
        handleClose={() => setIsOpen(false)}
        parentRef={ref}
        >
        <div className={dropdownClname}>
          <div className={styles['children-container']}>
            {children}
          </div>
          <Calendar range={value} onChange={onChange} />
        </div>
      </Portal>}
    </div>
  )
}

export default DateRangePicker