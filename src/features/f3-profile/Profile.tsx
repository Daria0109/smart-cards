import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {Redirect} from 'react-router-dom';
import s from './Profile.module.css'
import {initializeProfile} from '../../main/m3-bll/profile-reducer';
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {RequestStatusType, setRequestError} from '../../main/m3-bll/app-reducer';
import defaultAvatar from './../../assets/default-avatar.png'



export const Profile = () => {
  const [isFirst, setIsFirst] = useState(true)
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const userId = useSelector<AppRootStateType, string | null>(state => state.profile.userId)
  const userName = useSelector<AppRootStateType, string | null>(state => state.profile.userName)
  const cardsCount = useSelector<AppRootStateType, number | null>(state => state.profile.publicCardPacksCount)
  const userAvatar = useSelector<AppRootStateType, string>(state => state.profile.avatar)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.profile.isInitialized)
  const initializeError = useSelector<AppRootStateType, null | string>(state => state.app.requestError)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch();
  let timerId: any;

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeProfile())
    }
    return function cleanup () {
      clearTimeout(timerId)
    }
  }, [])

  if (appStatus === 'loading') {
    return <Preloader/>
  }

  if (!isFirst) {
    dispatch(setRequestError(null))
    return <Redirect to={PATH.LOGIN}/>
  }

  if (initializeError) {
    timerId = setTimeout(() => {
      dispatch(setRequestError(null))
      setIsFirst(false)
    }, 2000)
  }


    return <div className={s.profile}>
    {isLoggedIn && <div className={s.userProfile}>
      {!userAvatar && <div className={s.avatar}><img src={defaultAvatar} alt={'Avatar'}/></div>}
      <div className={s.data}>
        <div className={s.dataRow}>Name: <span>{userName}</span></div>
        <div className={s.dataRow}>Count of Cards: <span>{cardsCount}</span></div>
      </div>
    </div>}
    {/*{initializeError && <div className={s.initializedError}>{initializeError}</div>}*/}

  </div>
}





