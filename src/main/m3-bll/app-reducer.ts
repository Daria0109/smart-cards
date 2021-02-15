import {ActionsType} from './auth-reducer';


// A c t i o n s
export const appActions = {
  setAppStatus: (status: RequestStatusType) => ({
    type: 'cards/app/SET-STATUS', status} as const),
  setRequestError: (errorText: string | null) => ({
    type: 'cards/app/SET-REQUEST-ERROR', errorText} as const)
}
export type AppActionsType = ReturnType<ActionsType<typeof appActions>>


// S t a t e
const initState: AppInitStateType = {
  status: 'idle',
  requestError: null
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitStateType = {
  status: RequestStatusType
  requestError: string | null
}

// R e d u c e r
export const appReducer = (state: AppInitStateType = initState, action: AppActionsType): AppInitStateType => {
  switch (action.type) {
    case 'cards/app/SET-STATUS':
      return {
        ...state,
        status: action.status
      }
    case 'cards/app/SET-REQUEST-ERROR':
      return {
        ...state,
        requestError: action.errorText
      }
    default:
      return {...state}
  }
}
