import React from 'react';
import {useDispatch} from 'react-redux';
import s from '../../f6-packs/PacksTableRow/PacksTableRow.module.css';

type CardItemPropsType = {
  answer: string
  question: string
  grade: number
  comments: string
  cardId: string
  isOwner: boolean
}

export const CardsTableRow: React.FC<CardItemPropsType> = ({answer, cardId, isOwner,
                                                             comments, grade,  question}) => {
  const dispatch = useDispatch()

  const deleteCardHandler = () => {
  }

  return <div className={s.row}>
    <div className={s.rowItem}>{answer}</div>
    <div className={s.rowItem}>{question}</div>
    <div className={s.rowItem}>{grade}</div>
    <div className={s.rowItem}>{comments}</div>
    <div className={s.rowItem}>
      {isOwner
      && <button className={s.button} onClick={deleteCardHandler}>Delete</button>}
    </div>

    <div className={s.rowItem}>
      {isOwner
      && <button className={s.button}>Update</button>}
    </div>

  </div>
}