import React from 'react';
import s from './PageSizeSelector.module.css'

type PageSizeSelectorPropsType = {
  pageSize: number;
  setActivePageSize: (pageSize: number) => void
}

export const PageSizeSelector: React.FC<PageSizeSelectorPropsType> = React.memo(
  ({pageSize, setActivePageSize}) => {
  const pageSizeArr = [10, 20, 30, 40, 50]
  return <div className={s.container}>
    {pageSizeArr.map(c => {
      return <span key={c}
                   className={c === pageSize ? `${s.selector} ${s.active}` : `${s.selector}`}
                   onClick={() => setActivePageSize(c)}>{c}</span>
    })}
  </div>
})