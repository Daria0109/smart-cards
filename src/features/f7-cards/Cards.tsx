import React, {useCallback, useEffect} from 'react';
import {SearchForm} from '../../main/m2-components/SearchForm/SearchForm';
import {PageSizeSelector} from '../../main/m2-components/PageSizeSelector/PageSizeSelector';
import {Paginator} from '../../main/m2-components/Paginator/Paginator';
import s from './Cards.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {CardType} from '../../main/m4-dal/packs-cards-API';
import {CardsTableRow} from './CardsTableRow/CardsTableRow';
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import {cardsActions, fetchCards} from '../../main/m3-bll/card-reducer';
import {initializeUser} from '../../main/m3-bll/auth-reducer';

export const Cards = () => {
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const userId = useSelector<AppRootStateType, string | null>(state => state.profile.userId)
  const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
  const packId = useSelector<AppRootStateType, string>(state => state.packs.openedPackId)
  const pageNumber = useSelector<AppRootStateType, number>(state => state.cards.pageNumber)
  const pageSize = useSelector<AppRootStateType, number>(state => state.cards.pageSize)
  const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeUser())
    }
  }, [])
  useEffect(() => {
    if (isLoggedIn && packId) {
      dispatch(fetchCards(packId))
    }
  }, [packId, pageNumber, pageSize])
  const addCardHandler = () => {
  }

  const setActiveCardsPageSize = useCallback((pageSize: number) => {
    dispatch(cardsActions.setActivePageSize(pageSize))
  }, [])
  const setActiveCardsPageNumber = (page: number) => {
    dispatch(cardsActions.setActivePageNumber(page))
  }

  const tableRows = cards.map(c => <CardsTableRow key={c._id}
                                                  answer={c.answer}
                                                  question={c.question}
                                                  grade={c.grade}
                                                  comments={c.comments}
                                                  cardId={c._id}
                                                  isOwner={userId === c.user_id}/>)
  if (appStatus === 'loading') {
    return <Preloader/>
  }
  if (appStatus === 'failed') {
    return <Redirect to={PATH.LOGIN}/>
  }

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
      <PageSizeSelector pageSize={pageSize}
                        setActivePageSize={setActiveCardsPageSize}/>
      <Paginator pageSize={pageSize}
                 pageNumber={pageNumber}
                 setActivePageNumber={setActiveCardsPageNumber}
                 totalItemsCount={cardsTotalCount}/>
    </div>


  </div>
}