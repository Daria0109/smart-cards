import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {
  createCardsPack, deleteCardsPack,
  fetchPacks, packActions
} from '../../main/m3-bll/packs-reducer';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import s from './Packs.module.css'
import {CardPackType} from '../../main/m4-dal/packs-cards-API';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {initializeUser} from '../../main/m3-bll/auth-reducer';


const pageSizeArr = [10, 20, 30, 40, 50]

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
  const showMyPacksHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(packActions.setIsMyPacks(!isMyPacks))
  }

  // const pagesCount = Math.ceil(pagesTotalCount / pageSize)
  // const pagesArr = []
  // for (let i = 1; i <= pagesCount; i++) {
  //   pagesArr.push(i)
  // }
  // const pageElements = pagesArr.map(p => {
  //   const setActivePageHandler = () => {
  //     dispatch(packActions.setActivePageNumber(p))
  //   }
  //   return <span key={p}
  //                className={p === pageNumber ? `${s.page} ${s.active}` : `${s.page}`}
  //                onClick={setActivePageHandler}>{p}</span>
  // })
  const pageSizeElements = pageSizeArr.map(c => {
    const setActivePageSizeHandler = () => {
      dispatch(packActions.setActivePageSize(c))
    }
    return <span key={c} style={{background: '#fff'}}
                 className={c === pageSize ? `${s.page} ${s.active}` : `${s.page}`}
                 onClick={setActivePageSizeHandler}>{c}</span>
  })

  const tableRows = cardPacks.map(p => <PackItem key={p.created}
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
    <div>
      <Paginator/>
    </div>
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


type PaginatorPropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
  portionSize: number
}
export const Paginator = React.memo(() => {
  const pageNumber = useSelector<AppRootStateType, number>(state => state.packs.pageNumber)
  const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageSize)
  const packsTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
  const portionSize = 10
  const dispatch = useDispatch()

  const setActivePageHandler = (page: number) => {
    dispatch(packActions.setActivePageNumber(page))
  }


  const pageCount: number = Math.ceil(packsTotalCount / pageSize);
  const pages: Array<number> = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  const portionCount = Math.ceil(pageCount / portionSize)
  const [portionNumber, setPortionNumber] = useState(Math.ceil(pageNumber / portionSize));
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;
  return <>
    {portionNumber > 1 &&
    <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}
    {pages
      .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map((p: number, i: any) => {
        const pageStyle = p === pageNumber ? s.active_page : '';
        return <span key={i}
                className={pageStyle}
                onClick={() => setActivePageHandler(p)}> {p} </span>
      })
    }
    {portionCount > portionNumber &&
    <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
  </>
})
