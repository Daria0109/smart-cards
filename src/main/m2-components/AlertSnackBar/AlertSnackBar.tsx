import React, {useEffect} from 'react';
import s from './AlertSnackBar.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m3-bll/store';
import {appActions} from '../../m3-bll/app-reducer';


export const AlertSnackBar: React.FC = () => {
  const requestError = useSelector<AppRootStateType, string | null>(state => state.app.requestError)
  const snackStyle = requestError ? `${s.snack} ${s.active}` : s.snack
  const dispatch = useDispatch()

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(appActions.setRequestError(null))
    }, 5000)
    return () => {
      clearTimeout(timerId)
    }
  }, [requestError])

  const closeAlertHandler = () => {
    dispatch(appActions.setRequestError(null))
  }

  return <div className={snackStyle}>
    <button className={s.close} onClick={closeAlertHandler}>&times;</button>
    <span className={s.errorMessage}>{requestError}</span>
  </div>
}