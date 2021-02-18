import React from 'react';
import {SearchForm} from '../../main/m2-components/SearchForm/SearchForm';
import {PageSizeSelector} from '../../main/m2-components/PageSizeSelector/PageSizeSelector';
import {Paginator} from '../../main/m2-components/Paginator/Paginator';
import s from './Cards.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {CardType} from '../../main/m4-dal/packs-cards-API';
import {CardsTableRow} from './CardsTableRow/CardsTableRow';

export const Cards = () => {
  const userId = useSelector<AppRootStateType, string | null>(state => state.profile.userId)
  const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
  const dispatch = useDispatch()
  const addCardHandler = () => {
  }

  const tableRows = cards.map(c => <CardsTableRow key={c._id}
                                                  answer={c.answer}
                                                  question={c.question}
                                                  grade={c.grade}
                                                  comments={c.comments}
                                                  cardId={c._id}
                                                  isOwner={userId === c.user_id}/>)

  return <div className={s.cardsPage}>
    <div className={s.tableControls}>
      <button className={s.button} onClick={addCardHandler}>Add new Card</button>
      <SearchForm/>
    </div>
    <div className={s.table}>
      <div className={s.headerTable}>
        <div className={s.headerItem}>Answer</div>
        <div className={s.headerItem}>Question</div>
        <div className={s.headerItem}>Grade</div>
        <div className={s.headerItem}>Comments</div>
        <div className={s.headerItem}>Delete</div>
        <div className={s.headerItem}>Update</div>
      </div>
      <div className={s.rows}>
        {tableRows}
      </div>
    </div>
    <div className={s.pageControls}>
      <PageSizeSelector/>
      <Paginator/>
    </div>


  </div>
}