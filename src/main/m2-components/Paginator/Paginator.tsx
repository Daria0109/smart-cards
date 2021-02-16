import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m3-bll/store';
import {packActions} from '../../m3-bll/packs-reducer';
import s from './Paginator.module.css';



export const Paginator = React.memo(() => {
  const pageNumber = useSelector<AppRootStateType, number>(state => state.packs.pageNumber)
  const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageSize)
  const packsTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
  const portionSize = 10
  const dispatch = useDispatch()

  const setActivePageHandler = (page: number) => {
    dispatch(packActions.setActivePageNumber(page))
  }
  const prevButtonHandler = () => {
    setActivePageHandler(pageNumber - 1)
    setPortionNumber(portionNumber - 1)
  }
  const nextButtonHandler = () => {
    setActivePageHandler(pageNumber + 1)
    setPortionNumber(portionNumber + 1)
  }

  const pageCount: number = Math.ceil(packsTotalCount / pageSize);
  const pages: Array<number> = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  // const portionCount = Math.ceil(pageCount / portionSize)
  const [portionNumber, setPortionNumber] = useState(Math.ceil(pageNumber / portionSize));
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
                     onClick={() => setActivePageHandler(p)}> {p} </span>
      })
    }
    {<button className={`${s.item} ${s.button}`}
             onClick={nextButtonHandler}
            disabled={pageNumber === Math.ceil(packsTotalCount / pageSize)}>&#187;</button>}
  </div>
})