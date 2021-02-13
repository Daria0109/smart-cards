import React from 'react';
import s from './Preloader.module.css'

export const Preloader = () => {
  return <div className={s.preloaderPage}>
    <div className={s.preloader}>Loading...</div>
  </div>
}
