import {Dispatch} from 'redux';
import {CardPackType, packsCardsAPI} from '../m4-dal/packs-cards-API';
import {AppActionsType, appActions} from './app-reducer';
import {AppRootStateType} from './store';
import {ActionsType} from './auth-reducer';


// A c t i o n s
export const packActions = {
  setCardPacksData: (packs: Array<CardPackType>, pageNumber: number,
                                   pageSize: number, packsTotalCount: number) => ({
    type: 'cards/packs/SET-CARD-PACKS-DATA', packs, pageNumber, pageSize, packsTotalCount
  } as const),
  setActivePageNumber: (pageNumber: number) => ({
    type: 'cards/packs/SET-ACTIVE-PAGE-NUMBER', pageNumber
  } as const),
  setActivePageSize: (pageSize: number) => ({
    type: 'cards/packs/SET-ACTIVE-PAGE-SIZE', pageSize
  } as const),
  setIsMyPacks: (isMine: boolean) => ({
    type: 'cards/packs/SET-IS-MY-PACKS', isMine
  } as const)
}
export type PacksActionType = ReturnType<ActionsType<typeof packActions>>

// S t a t e
const packsInitialState = {
  cardPacks: [] as Array<CardPackType>,
  pageNumber: 1,
  pageSize: 10,
  cardPacksTotalCount: 7,
  packName: 'Funny Bunny',
  isMyPacks: false
}
export type PackStateType = typeof packsInitialState;


// R e d u c e r
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
      dispatch(appActions.setAppStatus('loading'))
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
      dispatch(packActions.setCardPacksData(data.cardPacks, data.page, data.pageCount, data.cardPacksTotalCount))
      console.log('NEW PACK', data)
    } catch (error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('NO PACK')
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}
export const createCardsPack = (pageSize: number, packName: string, isMine: boolean) => {
  return async (dispatch: Dispatch<PacksActionType | AppActionsType | any>) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      await packsCardsAPI.createCardsPack(packName)
      await dispatch(fetchPacks(1, pageSize))
      console.log('Pack was created')
    } catch (error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('Pack is NOT created')
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}
export const deleteCardsPack = (packId: string) => {
  return async (dispatch: Dispatch<PacksActionType | AppActionsType | any>, getState: () => AppRootStateType) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      const pageNumber = getState().packs.pageNumber
      const pageSize = getState().packs.pageSize
      await packsCardsAPI.deleteCardsPack(packId)
      await dispatch(fetchPacks(pageNumber, pageSize))
      console.log('Pack is deleted')
    } catch (error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('Pack is NOT deleted')
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}