import React from 'react'
import { createPortal } from 'react-dom';
import styles from './Portal.module.css';

import { getDropDownPosition } from '../utils';

type Props = {
  handleClose: () => void;
  parentRef: React.MutableRefObject<HTMLDivElement | null>
} & React.PropsWithChildren

const Portal = ({handleClose, parentRef, children}: Props) => {

  const nodeRef = React.useRef(null)

  const coordinates = getDropDownPosition(parentRef)

  const onClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target === nodeRef.current) handleClose();
    else return;
  };

  React.useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = 'scroll';
    };
  },[])


  return createPortal(
    <div
      ref={nodeRef}
      onClick={onClickOutside}
      className={styles.portal}
    >
      <div
      style={{
        position: 'absolute',
        left: coordinates.left,
        top: coordinates.top
      }}
      >
        {children}
      </div>
    </div>
    ,document.body)
}

export default Portal