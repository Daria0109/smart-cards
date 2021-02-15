import React from 'react';
import {Redirect, Route, Switch, useParams} from 'react-router-dom';
import {Test} from '../../../features/f0-test/Test';
import {Login} from '../../../features/f1-login/Login';
import {SignUp} from '../../../features/f2-signUp/SignUp';
import {Profile} from '../../../features/f3-profile/Profile';
import {Error404} from '../../../features/f7-error404/Error404';
import {RefreshPassword} from '../../../features/f5-refreshPassword/RefreshPassword';
import {SetPassword} from '../../../features/f4-setPassword/SetPassword';
import {Packs} from '../../../features/f6-packs/Packs';

export const PATH = {
  TEST: '/test',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  REFRESH: '/refresh',
  SET_TOKEN: '/set/:token',
  SET: '/set',
  PACKS: '/packs-of-cards',
  CARDS: '/cards',
  ERROR404: '/404'
}


export const Routes = () => {

  return <>
      <Switch>
        <Route path={"/"} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
        <Route path={PATH.LOGIN} render={() => <Login/>}/>
        <Route path={PATH.TEST} render={() => <Test/>}/>
        <Route path={PATH.SIGNUP} render={() => <SignUp/>}/>
        <Route path={PATH.PROFILE} render={() => <Profile/>}/>
        <Route path={PATH.PACKS} render={() => <Packs/>}/>
        <Route path={PATH.REFRESH} render={() => <RefreshPassword/>}/>
        <Route path={PATH.SET} exact render={() => <SetPassword/>}/>
        <Route path={PATH.SET_TOKEN} render={() => <SetPassword/>}/>
        <Route path={PATH.ERROR404} render={() => <Error404/>}/>

        <Route render={() => <Redirect to={PATH.ERROR404}/>}/>
      </Switch>
    </>
}
