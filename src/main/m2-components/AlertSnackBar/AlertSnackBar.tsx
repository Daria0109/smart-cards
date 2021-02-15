import React from 'react';
import s from './AlertSnackBar.module.css'
import {useDispatch} from 'react-redux';
import {setRequestError} from '../../m3-bll/app-reducer';

type AlertSnackBarPropsType = {
  isOpened: boolean
  error: string | null
}


export const AlertSnackBar: React.FC<AlertSnackBarPropsType> = ({isOpened, error}) => {
  const snackStyle = isOpened ? `${s.snack} ${s.active}` : s.snack
  const dispatch = useDispatch()

  const closeAlertHandler = () => {
    dispatch(setRequestError(null))
  }

  return <div className={snackStyle}>
    <button className={s.close} onClick={closeAlertHandler}>&times;</button>
    <span className={s.errorMessage}>{error}</span>
  </div>
}