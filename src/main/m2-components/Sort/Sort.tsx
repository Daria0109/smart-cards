import React from 'react';
import s from './Sort.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {packActions} from '../../m3-bll/packs-reducer';
import {AppRootStateType} from '../../m3-bll/store';

type SortPropsType = {
  up: string
  down: string
}

export const Sort: React.FC<SortPropsType> = ({up, down}) => {
  const sortPackValue = useSelector<AppRootStateType, string>(state => state.packs.sortPacksValue)
  const dispatch = useDispatch();
  const upStyle = sortPackValue === up ? `${s.button} ${s.up} ${s.active}` : `${s.button} ${s.up}`
  const downStyle = sortPackValue === down ? `${s.button} ${s.down} ${s.active}` : `${s.button} ${s.down}`

  const upSortHandler = () => {
    dispatch(packActions.setSortPacksValue(up))
  }
  const downSortHandler = () => {
    dispatch(packActions.setSortPacksValue(down))
  }

  return <div className={s.sort}>
    <button className={upStyle} onClick={upSortHandler}>&#10095;</button>
    <button className={downStyle} onClick={downSortHandler}>&#10095;</button>
  </div>
}