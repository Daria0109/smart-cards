import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {
  createCardsPack, deleteCardsPack,
  fetchPacks,
  setActivePageNumber,
  setActivePageSize,
  setIsMyPacks
} from '../../main/m3-bll/packs-reducer';
import React, {ChangeEvent, useEffect} from 'react';
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import s from './Packs.module.css'
import {CardPackType} from '../../main/m4-dal/packs-cards-API';
import {initializeProfile} from '../../main/m3-bll/profile-reducer';


const pageSizeArr = [10, 20, 30, 40, 50]

export const Packs = () => {
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const cardPacks = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs.cardPacks)
  const pageNumber = useSelector<AppRootStateType, number>(state => state.packs.pageNumber)
  const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageSize)
  const pagesTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
  const packName = useSelector<AppRootStateType, string>(state => state.packs.packName)
  const isMyPacks = useSelector<AppRootStateType, boolean>(state => state.packs.isMyPacks)
  const userId = useSelector<AppRootStateType, string | null>(state => state.profile.userId)
  const dispatch = useDispatch();


  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeProfile())
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
  const showMyPacksHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsMyPacks(!isMyPacks))
  }

  const pagesCount = Math.ceil(pagesTotalCount / pageSize)
  const pagesArr = []
  for (let i = 1; i <= pagesCount; i++) {
    pagesArr.push(i)
  }
  const pageElements = pagesArr.map(p => {
    const setActivePageHandler = () => {
      dispatch(setActivePageNumber(p))
    }
    return <span key={p}
                 className={p === pageNumber ? `${s.page} ${s.active}` : `${s.page}`}
                 onClick={setActivePageHandler}>{p}</span>
  })
  const pageSizeElements = pageSizeArr.map(c => {
    const setActivePageSizeHandler = () => {
      dispatch(setActivePageSize(c))
    }
    return <span key={c} style={{background: '#fff'}}
                 className={c === pageSize ? `${s.page} ${s.active}` : `${s.page}`}
                 onClick={setActivePageSizeHandler}>{c}</span>
  })

  const tableRows = cardPacks.map(p => <PackItem key={p.created}
                                                 title={p.name}
                                                 countCards={p.cardsCount}
                                                 dateUpdate={p.updated}
                                                 packId={p._id}
                                                 isOwner={userId === p.user_id}/>)

  if (appStatus === 'loading') {
    return <Preloader/>
  }

  return <div className={s.packsPage}>
    {pageElements}
    <div>{pageSizeElements}</div>
    <div>
      <input type='checkbox' id='myPacks' checked={isMyPacks} onChange={showMyPacksHandler}/>
      <label htmlFor='myPacks'>Show my packs</label>
    </div>
    <button onClick={addPackHandler}>Add new pack</button>
    <div className={s.table}>
      <div className={s.headerTable}>
        <div className={s.headerItem}>Title</div>
        <div className={s.headerItem}>Count of cards</div>
        <div className={s.headerItem}>Updated</div>
        <div className={s.headerItem}>Delete</div>
        <div className={s.headerItem}>Update</div>
        <div className={s.headerItem}>Go to Cards</div>
      </div>
    </div>
    {tableRows}

  </div>
}


type PackItemPropsType = {
  title: string
  countCards: number
  dateUpdate: string
  packId: string
  isOwner: boolean
}

export const PackItem: React.FC<PackItemPropsType> = ({title, countCards, dateUpdate, packId, isOwner}) => {
  const dispatch = useDispatch()

  const deletePackHandler = () => {
    dispatch(deleteCardsPack(packId))
  }

  return <div className={s.row}>
    <div className={s.rowItem}>{title}</div>
    <div className={s.rowItem}>{countCards}</div>
    <div className={s.rowItem}>{dateUpdate}</div>
    <div className={s.rowItem}>
      {isOwner && <button onClick={deletePackHandler}>Delete</button>}
    </div>

    <div className={s.rowItem}>
      {isOwner && <button>Update</button>}
    </div>
    <div className={s.rowItem}>Cards Link</div>
  </div>
}