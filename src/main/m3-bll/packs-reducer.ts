import {Dispatch} from 'redux';
import {CardPackType, packsCardsAPI} from '../m4-dal/packs-cards-API';
import {AppActionsType, setAppStatus} from './app-reducer';
import {AppRootStateType} from './store';

export const setCardPacksData = (packs: Array<CardPackType>, pageNumber: number,
                                 pageSize: number, packsTotalCount: number) => ({
  type: 'cards/packs/SET-CARD-PACKS-DATA', packs, pageNumber, pageSize, packsTotalCount
} as const)
export const setActivePageNumber = (pageNumber: number) => ({
  type: 'cards/packs/SET-ACTIVE-PAGE-NUMBER', pageNumber
} as const)
export const setActivePageSize = (pageSize: number) => ({
  type: 'cards/packs/SET-ACTIVE-PAGE-SIZE', pageSize
} as const)
export const setIsMyPacks = (isMine: boolean) => ({
  type: 'cards/packs/SET-IS-MY-PACKS', isMine
} as const)
export type PacksActionType = ReturnType<typeof setCardPacksData>
  | ReturnType<typeof setActivePageNumber>
  | ReturnType<typeof setActivePageSize>
  | ReturnType<typeof setIsMyPacks>


const packsInitialState = {
  cardPacks: [] as Array<CardPackType>,
  pageNumber: 1,
  pageSize: 10,
  cardPacksTotalCount: 7,
  packName: 'Funny Bunny',
  isMyPacks: false
}
export type PackStateType = typeof packsInitialState;

export const packsReducer = (state: PackStateType = packsInitialState, action: PacksActionType): PackStateType => {
  switch (action.type) {
    case 'cards/packs/SET-CARD-PACKS-DATA':
      return {
        ...state,
        cardPacks: action.packs,
        pageSize: action.pageSize,
        pageNumber: action.pageNumber,
        cardPacksTotalCount: action.packsTotalCount
      }
    case 'cards/packs/SET-ACTIVE-PAGE-NUMBER':
      return {
        ...state,
        pageNumber: action.pageNumber
      }
    case 'cards/packs/SET-ACTIVE-PAGE-SIZE':
      return {
        ...state,
        pageSize: action.pageSize
      }
    case 'cards/packs/SET-IS-MY-PACKS':
      return {
        ...state,
        isMyPacks: action.isMine
      }
    default:
      return state
  }
}

// T h u n k
export const fetchPacks = (pageNumber: number, pageSize: number) => {
  return async (dispatch: Dispatch<PacksActionType | AppActionsType>, getState: () => AppRootStateType) => {
    try {
      dispatch(setAppStatus('loading'))
      const isMine = getState().packs.isMyPacks
      const userId = getState().profile.userId
      let data;
      if (!isMine) {
        data = await packsCardsAPI.fetchPacks(pageNumber, pageSize)
      } else {
        if (userId) {
          data = await packsCardsAPI.fetchPacks(pageNumber, pageSize, userId)
        } else {
          throw new Error('NO USER_ID')
        }
      }
      dispatch(setCardPacksData(data.cardPacks, data.page, data.pageCount, data.cardPacksTotalCount))
      console.log('NEW PACK', data)
    } catch (error) {
      console.log(error)
      console.log('NO PACK')
    } finally {
      dispatch(setAppStatus('succeeded'))
    }
  }
}
export const createCardsPack = (pageSize: number, packName: string, isMine: boolean) => {
  return async (dispatch: Dispatch<PacksActionType | AppActionsType | any>) => {
    try {
      dispatch(setAppStatus('loading'))
      await packsCardsAPI.createCardsPack(packName)
      await dispatch(fetchPacks(1, pageSize))
      console.log('Pack was created')
    } catch (error) {
      console.log('Pack is NOT created')
    } finally {
      dispatch(setAppStatus('succeeded'))
    }
  }
}
export const deleteCardsPack = (packId: string) => {
  return async (dispatch: Dispatch<PacksActionType | AppActionsType | any>, getState: () => AppRootStateType) => {
    try {
      dispatch(setAppStatus('loading'))
      const pageNumber = getState().packs.pageNumber
      const pageSize = getState().packs.pageSize
      await packsCardsAPI.deleteCardsPack(packId)
      await dispatch(fetchPacks(pageNumber, pageSize))
      console.log('Pack is deleted')
    } catch (error) {
      console.log('Pack is NOT deleted')
    } finally {
      dispatch(setAppStatus('succeeded'))
    }
  }
}