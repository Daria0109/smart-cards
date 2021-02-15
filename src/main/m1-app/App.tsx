import React, {useEffect} from 'react';
import {Header} from '../m2-components/Header/Header';
import {HashRouter} from 'react-router-dom';
import {Routes} from '../m2-components/Routes/Routes';
import s from './App.module.css'
import {initializeProfile} from '../m3-bll/profile-reducer';
import {authActions} from '../m3-bll/auth-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../m3-bll/store';
import {Preloader} from '../m2-components/Preloader/Preloader';


export const App = () => {
  // const isInitialized = useSelector<AppRootStateType, boolean>(state => state.profile.isInitialized)
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   if (!isInitialized) {
  //     dispatch(initializeProfile())
  //   }
  //   dispatch(authActions.setLoginError(null))
  // }, [])
  //
  // if (!isInitialized) {
  //   return <Preloader/>
  // }

  return <div className={s.mainPage}>
    <HashRouter>
      <Header/>
      <div className={s.mainContainer}>
        <Routes/>
      </div>
    </HashRouter>
  </div>
}

