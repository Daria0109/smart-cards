import {applyMiddleware, combineReducers, compose, createStore } from "redux";
import {authReducer} from './auth-reducer';
import {profileReducer} from './profile-reducer';
import {testReducer} from './test-reducer';
import thunk from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {packsReducer} from './packs-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  testPage: testReducer,
  profile: profileReducer,
  app: appReducer,
  packs: packsReducer
})


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;