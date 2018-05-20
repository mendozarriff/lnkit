
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory } from 'react-router-3';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import LnkitArea from '../ui/LnkitArea';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/lnkit-area'];

const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        browserHistory.replace('/lnkit-area');
    }
}

const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.replace('/')
    }
}

export const onAuthChange = (isAuthenticated)=>{
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    if (isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/lnkit-area')
    } else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/')
    }
}


export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} onEnter={onEnterPublicPage} />
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
        <Route path="/lnkit-area" component={LnkitArea} onEnter={onEnterPrivatePage} />
        <Route path="*" component={NotFound} />
    </Router>
);
