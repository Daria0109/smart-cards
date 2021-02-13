// A c t i o n s
export const setAppStatus = (status: RequestStatusType) => ({
  type: 'cards/app/SET-STATUS', status
} as const)
export type AppActionsType = ReturnType<typeof setAppStatus>


// S t a t e
const initState: AppInitStateType = {
  status: 'idle'
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitStateType = {
  status: RequestStatusType

}

// R e d u c e r
export const appReducer = (state: AppInitStateType = initState, action: AppActionsType): AppInitStateType => {
  switch (action.type) {
    case 'cards/app/SET-STATUS':
      return {
        ...state,
        status: action.status
      }
    default:
      return {...state}
  }
}
