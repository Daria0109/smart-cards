import React, {ChangeEvent, useState} from 'react';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import s from './RefreshPassword.module.css'
import {authActions, sendEmail} from '../../main/m3-bll/auth-reducer';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';

export const RefreshPassword = () => {
  const isEmailSent = useSelector<AppRootStateType, boolean>(state => state.auth.isEmailSent)
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState('')

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.currentTarget.value)
  }
  const sendEmailHandler = () => {
    dispatch(sendEmail(emailValue))
  }

  return <div className={s.formWrapper}>
    <div className={s.container}>
      {!isEmailSent &&
      <div>
        <h2 className={s.title}>Forgot your password?</h2>
        <div className={s.editBlock}>
          <div className={s.itemForm}>
            <input type='text' placeholder='Enter email...' value={emailValue} onChange={changeEmailHandler}/>
          </div>
          <div className={s.itemForm}>
            <button className={s.button} onClick={sendEmailHandler} disabled={appStatus === 'loading'}>Send</button>
          </div>
        </div>
      </div>}

      {isEmailSent &&
      <div className={s.sent}>
        <p>Success!</p>
        <p>The link was sent to your email!</p>
      </div>}

      <NavLink className={s.link} to={PATH.LOGIN}>Log In</NavLink>

      {appStatus === 'loading' && <div className={s.overflow}>Please, wait...</div>}
    </div>
  </div>
}