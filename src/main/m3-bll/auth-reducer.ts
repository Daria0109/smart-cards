import {Dispatch} from 'redux';
import {ProfileActionsTypes, setUserData} from './profile-reducer';
import {AppActionsType, appActions} from './app-reducer';
import {authAPI} from '../m4-dal/authAPI';

// A c t i o n s
export const authActions = {
  setIsInitialized: (isInitialized: boolean) => ({
    type: 'cards/app/SET-IS-INITIALIZED', isInitialized
  } as const),
  setIsLoggedIn: (isLogged: boolean) => ({
    type: 'cards/auth/SET-IS-LOGGED-IN', isLogged} as const),
  setIsSignUp: (isSignUp: boolean) => ({
    type: 'cards/auth/SET-IS-SIGN-UP', isSignUp} as const),
  setIsEmailSent: (isSent: boolean) => ({
    type: 'cards/auth/SET-IS-EMAIL-SENT', isSent} as const),
  setIsPasswordChanged: (isChanged: boolean) => ({
    type: 'cards/auth/SET-IS-PASSWORD-CHANGED', isChanged} as const),
}
export type ActionsType<T> = T extends {[key: string]: infer U} ? U : never
export type AuthActionsType = ReturnType<ActionsType<typeof authActions>>


// S t a t e
const authInitState = {
  isInitialized: false,
  isLoggedIn: false,
  isSignUp: false,
  isEmailSent: false,
  isPasswordChanged: false,
}
export type AuthStateType = typeof authInitState


// T h u n k
export const initializeUser = () => {
  return async (dispatch: Dispatch<AppActionsType | ProfileActionsTypes | AuthActionsType>) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      const data = await authAPI.me()
      dispatch(authActions.setIsLoggedIn(true))
      dispatch(authActions.setIsInitialized(true))
      dispatch(setUserData(data.name, data.publicCardPacksCount, data._id))
      dispatch(appActions.setAppStatus('succeeded'))
      console.log('Initialized')

    } catch (error) {
      dispatch((appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred')))
      dispatch(appActions.setAppStatus('failed'))
      console.log('NOT Initialized')

    } finally {
      dispatch(appActions.setAppStatus('idle'))
    }
  }
}
export type RegDataType = {
  email: string
  password: string
}
export const signUp = (registrationData: RegDataType) => {
  return async (dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      await authAPI.signUp(registrationData)
      dispatch(authActions.setIsSignUp(true))
      console.log('SignUn')
    } catch (error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('NOT SignUn')
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}
export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
export const login = (loginData: LoginDataType) => {
  return async (dispatch: Dispatch<AuthActionsType | ProfileActionsTypes | AppActionsType>) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      const data = await authAPI.login(loginData)
      dispatch(setUserData(data.name, data.publicCardPacksCount, data._id))
      dispatch(authActions.setIsLoggedIn(true))
      console.log('LogIn')

    } catch (error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('NOT LogIn')
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}
export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      // dispatch(setAppStatus('loading'))
      await authAPI.logout()
      dispatch(authActions.setIsLoggedIn(false))
      dispatch(setUserData(null, null, null))
      console.log('LogOut')
    } catch (error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('NOT LogOut')

    } finally {
      // dispatch(setAppStatus('succeeded'))
    }
  }
}
export const sendEmail = (email: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      await authAPI.sendEmail(email)
      dispatch(authActions.setIsEmailSent(true))
      console.log('Email is sent')
    } catch (error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('Email is NOT sent')
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}
export const setPassword = (password: string, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      await authAPI.setPassword(password, token)
      dispatch(authActions.setIsPasswordChanged(true))
      console.log('Password set')
    } catch(error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('Password NOT set')
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}

// R e d u c e r
export const authReducer = (state: AuthStateType = authInitState, action: AuthActionsType): AuthStateType => {
  switch (action.type) {
    case 'cards/app/SET-IS-INITIALIZED':
      return {
        ...state,
        isInitialized: action.isInitialized
      }
    case 'cards/auth/SET-IS-LOGGED-IN':
      return {
        ...state,
        isLoggedIn: action.isLogged
      }
    case 'cards/auth/SET-IS-SIGN-UP': {
      return {
        ...state,
        isSignUp: action.isSignUp
      }
    }
    case 'cards/auth/SET-IS-EMAIL-SENT':
      return {
        ...state,
        isEmailSent: action.isSent
      }
    case 'cards/auth/SET-IS-PASSWORD-CHANGED':
      return {
        ...state,
        isPasswordChanged: action.isChanged
      }
    default:
      return state
  }
}
