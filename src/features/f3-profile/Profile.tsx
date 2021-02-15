import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {Redirect} from 'react-router-dom';
import s from './Profile.module.css'
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import defaultAvatar from './../../assets/default-avatar.png'
import {initializeUser} from '../../main/m3-bll/auth-reducer';


export const Profile = () => {
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const userName = useSelector<AppRootStateType, string | null>(state => state.profile.userName)
  const cardsCount = useSelector<AppRootStateType, number | null>(state => state.profile.publicCardPacksCount)
  const userAvatar = useSelector<AppRootStateType, string>(state => state.profile.avatar)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeUser())
    }
  }, [])


  if (appStatus === 'loading') {
    return <Preloader/>
  }
  if (appStatus === 'failed') {
    return <Redirect to={PATH.LOGIN}/>
  }


    return <div className={s.profile}>
    {isLoggedIn && <div className={s.userProfile}>
      {!userAvatar && <div className={s.avatar}><img src={defaultAvatar} alt={'Avatar'}/></div>}
      <div className={s.data}>
        <div className={s.dataRow}>Name: <span>{userName}</span></div>
        <div className={s.dataRow}>Count of Cards: <span>{cardsCount}</span></div>
      </div>
    </div>}
  </div>
}





