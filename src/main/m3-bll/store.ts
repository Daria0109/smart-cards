import {applyMiddleware, combineReducers, createStore } from "redux";
import {authReducer} from './auth-reducer';
import {profileReducer} from './profile-reducer';
import {testReducer} from './test-reducer';
import thunk from 'redux-thunk'
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  testPage: testReducer,
  profile: profileReducer,
  app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;