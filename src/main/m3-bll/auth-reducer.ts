import {Dispatch} from 'redux';
import {ProfileActionsTypes, setUserData} from './profile-reducer';
import {AppActionsType, setAppStatus} from './app-reducer';
import {authAPI} from '../m4-dal/authAPI';

// A c t i o n s
export const authActions = {
  setIsLoggedIn: (isLogged: boolean) => ({
    type: 'cards/auth/SET-IS-LOGGED-IN', isLogged} as const),
  setLoginError: (errorText: string | null) => ({
    type: 'cards/auth/SET-LOGIN-ERROR', errorText} as const),
  setIsSignUp: (isSignUp: boolean) => ({
    type: 'cards/auth/SET-IS-SIGN-UP', isSignUp} as const),
  setSignUpError: (errorText: string | null) => ({
    type: 'cards/auth/SET-SIGNUP-ERROR', errorText} as const),
  setIsEmailSent: (isSent: boolean) => ({
    type: 'cards/auth/SET-IS-EMAIL-SENT', isSent} as const),
  setRefreshPasswordError: (errorText: string | null) => ({
    type: 'cards/auth/SET-REFRESH-ERROR', errorText} as const),
  setIsPasswordChanged: (isChanged: boolean) => ({
    type: 'cards/auth/SET-IS-PASSWORD-CHANGED', isChanged} as const),
  setPasswordError: (errorText: string | null) => ({
    type: 'cards/auth/SET-PASSWORD-ERROR', errorText} as const),
  setRequestError: (error: string) => ({
    type: 'cards/auth/SET-REQUEST-ERROR', error} as const)
}
type ActionsType<T> = T extends {[key: string]: infer U} ? U : never
export type AuthActionsType = ReturnType<ActionsType<typeof authActions>>


// S t a t e
const authInitState = {
  isLoggedIn: false,
  loginError: null as string | null,
  isSignUp: false,
  signUpError: null as string | null,
  isEmailSent: false,
  refreshPasswordError: null as string | null,
  isPasswordChanged: false,
  setPasswordError: null as string | null,

  requestError: 'Errrrrrrrrrrrrrrrror'
}
export type AuthStateType = typeof authInitState


// T h u n k
export type RegDataType = {
  email: string
  password: string
}
export const signUp = (registrationData: RegDataType) => {
  return async (dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
    try {
      dispatch(setAppStatus('loading'))
      await authAPI.signUp(registrationData)
      dispatch(authActions.setIsSignUp(true))
      console.log('SignUn')
    } catch (error) {
      dispatch(authActions.setSignUpError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('NOT SignUn')
    } finally {
      dispatch(setAppStatus('succeeded'))
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
      dispatch(setAppStatus('loading'))
      const data = await authAPI.login(loginData)
      dispatch(setUserData(data.name, data.publicCardPacksCount, data._id))
      dispatch(authActions.setIsLoggedIn(true))
      console.log('LogIn')

    } catch (error) {
      dispatch(authActions.setLoginError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('NOT LogIn')
    } finally {
      dispatch(setAppStatus('succeeded'))
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
      dispatch(authActions.setLoginError(error.response ? error.response.data.error
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
      dispatch(setAppStatus('loading'))
      await authAPI.sendEmail(email)
      dispatch(authActions.setIsEmailSent(true))
      console.log('Email is sent')
    } catch (error) {
      dispatch(authActions.setRefreshPasswordError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('Email is NOT sent')
    } finally {
      dispatch(setAppStatus('succeeded'))
    }
  }
}
export const setPassword = (password: string, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setAppStatus('loading'))
      await authAPI.setPassword(password, token)
      dispatch(authActions.setIsPasswordChanged(true))
      console.log('Password set')
    } catch(error) {
      dispatch(authActions.setPasswordError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log('Password NOT set')
    } finally {
      dispatch(setAppStatus('succeeded'))
    }
  }
}

// R e d u c e r
export const authReducer = (state: AuthStateType = authInitState, action: AuthActionsType): AuthStateType => {
  switch (action.type) {
    case 'cards/auth/SET-LOGIN-ERROR':
      return {
        ...state,
        loginError: action.errorText
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
    case 'cards/auth/SET-SIGNUP-ERROR': {
      return {
        ...state,
        signUpError: action.errorText
      }
    }
    case 'cards/auth/SET-IS-EMAIL-SENT':
      return {
        ...state,
        isEmailSent: action.isSent
      }
    case 'cards/auth/SET-REFRESH-ERROR':
      return {
        ...state,
        refreshPasswordError: action.errorText
      }
    case 'cards/auth/SET-IS-PASSWORD-CHANGED':
      return {
        ...state,
        isPasswordChanged: action.isChanged
      }
    case 'cards/auth/SET-PASSWORD-ERROR':
      return {
        ...state,
        setPasswordError: action.errorText
      }
    case 'cards/auth/SET-REQUEST-ERROR':
      return {
        ...state,
        requestError: action.error
      }
    default:
      return state
  }
}
