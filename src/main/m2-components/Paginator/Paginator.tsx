import React, {useState} from 'react';
import s from './Paginator.module.css';


type PaginatorPropsType = {
  totalItemsCount: number
  pageSize: number
  pageNumber: number
  setActivePageNumber: (page: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = React.memo(({
  pageSize, pageNumber, setActivePageNumber, totalItemsCount
                                                                   }) => {
  const portionSize = 10
  const [portionNumber, setPortionNumber] = useState(Math.ceil(pageNumber / portionSize));

  const prevButtonHandler = () => {
    setActivePageNumber(pageNumber - 1)
    setPortionNumber(portionNumber - 1)
  }
  const nextButtonHandler = () => {
    setActivePageNumber(pageNumber + 1)
    setPortionNumber(portionNumber + 1)
  }

  const pageCount: number = Math.ceil(totalItemsCount / pageSize);
  const pages: Array<number> = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  // const portionCount = Math.ceil(pageCount / portionSize)

  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;
  return <div className={s.container}>
    {<button className={`${s.item} ${s.button}`}
             onClick={prevButtonHandler}
             disabled={pageNumber === 1}>&#171;</button>}
    {pages
      .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map((p: number, i: any) => {
        const pageStyle = p === pageNumber ? `${s.item} ${s.page} ${s.current}` : `${s.item} ${s.page}`;
        return <span key={i}
                     className={pageStyle}
                     onClick={() => setActivePageNumber(p)}> {p} </span>
      })
    }
    {<button className={`${s.item} ${s.button}`}
             onClick={nextButtonHandler}
            disabled={pageNumber === Math.ceil(totalItemsCount / pageSize)}>&#187;</button>}
</div>
})