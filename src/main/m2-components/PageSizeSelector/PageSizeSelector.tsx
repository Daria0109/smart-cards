import {packActions} from '../../m3-bll/packs-reducer';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m3-bll/store';
import s from './PageSizeSelector.module.css'


export const PageSizeSelector = () => {
  const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageSize)
  const dispatch = useDispatch()
  const pageSizeArr = [10, 20, 30, 40, 50]
  return <div className={s.container}>
    {pageSizeArr.map(c => {
      const setActivePageSizeHandler = () => {
        dispatch(packActions.setActivePageSize(c))
      }
      return <span key={c}
                   className={c === pageSize ? `${s.selector} ${s.active}` : `${s.selector}`}
                   onClick={setActivePageSizeHandler}>{c}</span>
    })}
  </div>
}