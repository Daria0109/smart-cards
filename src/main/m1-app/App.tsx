import React from 'react';
import {Header } from '../m2-components/Header/Header';
import {HashRouter} from 'react-router-dom';
import {Routes} from '../m2-components/Routes/Routes';
import s from './App.module.css'
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../m3-bll/store';


export const App = () => {
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.profile.isInitialized)
  return <div className={s.mainPage}>
    <HashRouter>
      <Header/>
      <div className={s.mainContainer}>
      <Routes/>
      </div>
    </HashRouter>
    </div>
}

