import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../Routes/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m3-bll/store';
import {logout} from '../../m3-bll/auth-reducer';
import s from './Header.module.css'

export const Header = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return <div className={s.header}>
    {isLoggedIn
      ? <button className={s.button} onClick={logoutHandler}>Log Out</button>
      : <NavLink to={PATH.LOGIN} className={s.button}>Log In</NavLink>}

    <ul className={s.menu}>

      <li className={s.menuItem}>
        <NavLink to={PATH.PROFILE} className={s.link} activeClassName={s.active}>Profile</NavLink>
      </li>

      <li className={s.menuItem}>
        <NavLink to={PATH.PACKS} className={s.link} activeClassName={s.active}>Packs</NavLink>
      </li>

      <li className={s.menuItem}>
        <NavLink to={PATH.REFRESH} className={s.link} activeClassName={s.active}>Forgot your password?</NavLink>
      </li>

    </ul>


  </div>
}