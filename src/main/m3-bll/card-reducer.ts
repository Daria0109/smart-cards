// A c t i o n s

import { ActionsType } from "./auth-reducer";
import {CardType} from '../m4-dal/packs-cards-API';

export const cardsActions = {
  setCards: () => ({type: 'cards/cards/SET-CARDS'})
}
export type CardsActionType = ReturnType<ActionsType<typeof cardsActions>>

// S t a t e
const cardsInitialState = {
  cards: [
    {
      "_id": "602e53ad487a3300049df46e",
      "cardsPack_id": "602e4d5a487a3300049df464",
      "user_id": "601fcd297348ca0004c56c62",
      "answer": "no answer",
      "question": "Updated",
      "grade": 0,
      "shots": 0,
      "comments": "Updated",
      "type": "card",
      "rating": 0,
      "more_id": "601fcd297348ca0004c56c62",
      "created": "2021-02-18T11:46:53.174Z",
      "updated": "2021-02-18T11:46:55.698Z",
      "__v": 0,
      "answerImg": "",
      "answerVideo": "",
      "questionImg": "",
      "questionVideo": ""
    },
    {
      "_id": "602e50c1487a3300049df469",
      "cardsPack_id": "602e4d5a487a3300049df464",
      "user_id": "601fcd297348ca0004c56c62",
      "answer": "no answer",
      "question": "Updated",
      "grade": 0,
      "shots": 0,
      "comments": "Updated",
      "type": "card",
      "rating": 0,
      "more_id": "601fcd297348ca0004c56c62",
      "created": "2021-02-18T11:34:25.110Z",
      "updated": "2021-02-18T11:46:50.901Z",
      "__v": 0,
      "answerImg": "",
      "answerVideo": "",
      "questionImg": "",
      "questionVideo": ""
    }
    ] as Array<CardType>,
  pageNumber: 1,
  pageSize: 10,
  cardTotalCount: 0,
  cardName: 'Super Card',
  searchCardName: '',
  sortCardsValues: ''
}
export type CardsStateType = typeof cardsInitialState;


// R e d u c e r
export const cardsReducer = (state: CardsStateType = cardsInitialState, action: CardsActionType): CardsStateType => {
  switch (action.type) {
    default:
      return state
  }
}
