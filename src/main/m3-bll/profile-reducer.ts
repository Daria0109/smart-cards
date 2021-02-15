// A c t i o n s
export const setUserData = (userName: string | null, cardsCount: number | null, userId: string | null) => ({
  type: 'cards/profile/SET-USER-DATA', userName, userId, cardsCount
} as const)
export type ProfileActionsTypes = ReturnType<typeof setUserData>

// S t a t e
const profileInitState = {
  userName: null as string | null,
  publicCardPacksCount: null as number | null,
  userId: null as string | null,
  avatar: '',
}
export type ProfileStateType = typeof profileInitState

// R d u c e r
export const profileReducer = (state: ProfileStateType = profileInitState, action: ProfileActionsTypes): ProfileStateType => {
  switch (action.type) {
    case 'cards/profile/SET-USER-DATA':
      return {
        ...state,
        userName: action.userName,
        publicCardPacksCount: action.cardsCount,
        userId: action.userId
      }
    default:
      return {...state}
  }
}


