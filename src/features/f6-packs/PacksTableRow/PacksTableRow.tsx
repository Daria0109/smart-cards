import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteCardsPack} from '../../../main/m3-bll/packs-reducer';
import s from './PacksTableRow.module.css'
import {NavLink} from 'react-router-dom';
import {PATH} from '../../../main/m2-components/Routes/Routes';


type PackItemPropsType = {
  title: string
  countCards: number
  dateUpdate: string
  packId: string
  isOwner: boolean
}

export const PacksTableRow: React.FC<PackItemPropsType> = ({title, countCards, dateUpdate, packId, isOwner}) => {
  const dispatch = useDispatch()

  const deletePackHandler = () => {
    dispatch(deleteCardsPack(packId))
  }

  return <div className={s.row}>
    <div className={s.rowItem}>{title}</div>
    <div className={s.rowItem}>{countCards}</div>
    <div className={s.rowItem}>{dateUpdate}</div>
    <div className={s.rowItem}>
      <NavLink to={PATH.CARDS} className={s.cardsLink}>Open</NavLink>
    </div>
    <div className={s.rowItem}>
      {isOwner
      && <button className={s.button} onClick={deletePackHandler}>Delete</button>}
    </div>

    <div className={s.rowItem}>
      {isOwner
      && <button className={s.button}>Update</button>}
    </div>

  </div>
}