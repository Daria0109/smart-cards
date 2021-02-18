import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCardsPack, packActions} from '../../../main/m3-bll/packs-reducer';
import s from './PacksTableRow.module.css'
import {NavLink} from 'react-router-dom';
import {PATH} from '../../../main/m2-components/Routes/Routes';
import {AppRootStateType} from '../../../main/m3-bll/store';


type PackItemPropsType = {
  title: string
  countCards: number
  dateUpdate: string
  packId: string
  isOwner: boolean
}

export const PacksTableRow: React.FC<PackItemPropsType> = ({title, countCards, dateUpdate, packId, isOwner}) => {
  const openedPack = useSelector<AppRootStateType, string>(state => state.packs.openedPackId)
  const dispatch = useDispatch()
  const rowStyle = openedPack === packId ? `${s.row} ${s.opened}` : `${s.row}`

  const deletePackHandler = () => {
    dispatch(deleteCardsPack(packId))
  }
  const openCardsHandler = () => {
    dispatch(packActions.setOpenedPackId(packId))
  }

  return <div className={rowStyle}>
    <div className={s.rowItem}>{title}</div>
    <div className={s.rowItem}>{countCards}</div>
    <div className={s.rowItem}>{dateUpdate}</div>
    <div className={s.rowItem}>
      <NavLink to={PATH.CARDS} className={s.cardsLink} onClick={openCardsHandler}>Open</NavLink>
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