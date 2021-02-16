import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {
  createCardsPack,
  fetchPacks, packActions
} from '../../main/m3-bll/packs-reducer';
import React, {useEffect} from 'react';
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import s from './Packs.module.css'
import {CardPackType} from '../../main/m4-dal/packs-cards-API';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {initializeUser} from '../../main/m3-bll/auth-reducer';
import {Paginator} from '../../main/m2-components/Paginator/Paginator';
import {PageSizeSelector} from '../../main/m2-components/PageSizeSelector/PageSizeSelector';
import {PacksTableRow} from './PacksTableRow/PacksTableRow';


export const Packs = () => {
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const cardPacks = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs.cardPacks)
  const pageNumber = useSelector<AppRootStateType, number>(state => state.packs.pageNumber)
  const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageSize)
  const packName = useSelector<AppRootStateType, string>(state => state.packs.packName)
  const isMyPacks = useSelector<AppRootStateType, boolean>(state => state.packs.isMyPacks)
  const userId = useSelector<AppRootStateType, string | null>(state => state.profile.userId)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeUser())
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchPacks(pageNumber, pageSize))
    }
  }, [isLoggedIn, pageNumber, pageSize, isMyPacks])


  const addPackHandler = () => {
    dispatch(createCardsPack(pageSize, packName, isMyPacks))
  }
  const showMyPacksHandler = () => {
    dispatch(packActions.setIsMyPacks(!isMyPacks))
  }
  const tableRows = cardPacks.map(p => <PacksTableRow key={p.created}
                                                      title={p.name}
                                                      countCards={p.cardsCount}
                                                      dateUpdate={p.updated.slice(0, 10)}
                                                      packId={p._id}
                                                      isOwner={userId === p.user_id}/>)
  if (appStatus === 'loading') {
    return <Preloader/>
  }
  if (appStatus === 'failed') {
    return <Redirect to={PATH.LOGIN}/>
  }

  return <div className={s.packsPage}>
    <div className={s.showMine}>
      <input type='checkbox' id='myPacks' checked={isMyPacks} onChange={showMyPacksHandler}/>
      <label htmlFor='myPacks'>Show my packs</label>
    </div>
    <div className={s.addBtn}>
    <button className={s.button} onClick={addPackHandler}>Add new Pack</button>
    </div>
    <div className={s.table}>
      <div className={s.headerTable}>
        <div className={s.headerItem}>Title</div>
        <div className={s.headerItem}>Count of cards</div>
        <div className={s.headerItem}>Updated</div>
        <div className={s.headerItem}>Cards</div>
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






