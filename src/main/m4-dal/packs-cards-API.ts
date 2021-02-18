import axios from 'axios';
import {stringify} from 'querystring';
import {finished} from 'stream';


const baseLocalhostURL = 'http://localhost:7542/2.0/'
const baseHerokuURL = 'https://neko-back.herokuapp.com/2.0/'

const instance = axios.create({
  baseURL: baseLocalhostURL,
  withCredentials: true,
})
export type CardPackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
export type GetResponsePacksCardsType = {
  cardPacks: Array<CardPackType>
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: 'card',
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}
export type GetResponseCardsType = {
  cards: Array<CardType>
  packUserId: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}


export type PostResponsePacksCardsType = {
  newCardsPack: CardPackType
  token: string
  tokenDeathTime: string
}
export type DeleteResponsePacksCardsType = {
  deletedCardsPack: CardPackType
  token: string
  tokenDeathTime: string
}

export const packsCardsAPI = {
  fetchPacks(pageNumber: number, pageSize: number, packName: string, sort?: string, userId?: string) {
    return instance.get<GetResponsePacksCardsType>(userId
      ? `cards/pack?page=${pageNumber}&pageCount=${pageSize}&user_id=${userId}`
      + (packName ? `&packName=${packName}` : '') + (sort ? `&sortPacks=${sort}` : '')
      : `cards/pack?page=${pageNumber}&pageCount=${pageSize}`
      + (packName ? `&packName=${packName}` : '') + (sort ? `&sortPacks=${sort}` : ''))
      .then(res => res.data)
  },
  createCardsPack(name: string) {
    return instance.post<PostResponsePacksCardsType>('cards/pack', {
      cardsPack: {name}
    }).then(res => res.data)
  },
  deleteCardsPack(packId: string) {
    return instance.delete<DeleteResponsePacksCardsType>(`cards/pack?id=${packId}`)
      .then(res => res.data)
  },
  fetchCards(packId: string, pageNumber: number, pageSize: number) {
    return instance.get<GetResponseCardsType>(`cards/card?cardsPack_id=${packId}&page=${pageNumber}&pageCount=${pageSize}`)
      .then(res => res.data)
  }
}