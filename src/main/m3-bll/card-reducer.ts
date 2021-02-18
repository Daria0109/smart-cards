// A c t i o n s

import {ActionsType} from './auth-reducer';
import {CardType, packsCardsAPI} from '../m4-dal/packs-cards-API';
import { Dispatch } from 'redux';
import {appActions} from './app-reducer';
import {AppRootStateType} from './store';

export const cardsActions = {
  setCardsData: (cards: Array<CardType>, pageNumber: number,
                 pageSize: number, cardsTotalCount: number) => ({
    type: 'cards/cards/SET-CARDS-DATA', cards, pageNumber, pageSize, cardsTotalCount
  } as const),
  setActivePageSize: (pageSize: number) => ({
    type: 'cards/cards/SET-ACTIVE-PAGE-SIZE', pageSize
  } as const),
  setActivePageNumber: (pageNumber: number) => ({
    type: 'cards/cards/SET-ACTIVE-PAGE-NUMBER', pageNumber
  } as const),
}
export type CardsActionType = ReturnType<ActionsType<typeof cardsActions>>

// S t a t e
const cardsInitialState = {
  cards: [] as Array<CardType>,
  pageNumber: 1,
  pageSize: 10,
  cardsTotalCount: 0,
  cardName: 'Super Card',
  searchCardName: '',
  sortCardsValues: ''
}
export type CardsStateType = typeof cardsInitialState;


// R e d u c e r
export const cardsReducer = (state: CardsStateType = cardsInitialState, action: CardsActionType): CardsStateType => {
  switch (action.type) {
    case 'cards/cards/SET-CARDS-DATA':
      return {
        ...state,
        cards: action.cards,
        pageNumber: action.pageNumber,
        pageSize: action.pageSize,
        cardsTotalCount: action.cardsTotalCount
      }
    case 'cards/cards/SET-ACTIVE-PAGE-SIZE':
      return {
        ...state,
        pageSize: action.pageSize
      }
    case 'cards/cards/SET-ACTIVE-PAGE-NUMBER':
      return {
        ...state,
        pageNumber: action.pageNumber
      }
    default:
      return state
  }
}

// T h u n k
export const fetchCards = (packId: string) => {
  return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      const pageNumber = getState().cards.pageNumber
      const pageSize = getState().cards.pageSize
      const data = await packsCardsAPI.fetchCards(packId, pageNumber, pageSize)
      dispatch(cardsActions.setCardsData(data.cards, data.page, data.pageCount, data.cardsTotalCount))
      console.log('GET cards')

    } catch(error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('NO CARDS')
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}
