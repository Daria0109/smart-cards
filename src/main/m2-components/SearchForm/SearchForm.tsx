import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m3-bll/store';
import debounce from 'lodash.debounce';
import {packActions} from '../../m3-bll/packs-reducer';
import s from './SearchForm.module.css'

export const SearchForm: React.FC = () => {
  const searchPackName = useSelector<AppRootStateType, string>(state => state.packs.searchPackName)
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(searchPackName)

  const debouncedSearch = useCallback(debounce((nextValue: string) => {
    dispatch(packActions.setSearchPackName(nextValue))
  }, 1500), [dispatch])

  const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const nextSearchValue = e.currentTarget.value
    setSearchValue(nextSearchValue)
    debouncedSearch(nextSearchValue)
  }
  return <div>
    <input placeholder='Search...' className={s.searchInput} value={searchValue} onChange={changeValueHandler}/>
  </div>
}