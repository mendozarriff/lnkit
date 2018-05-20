import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';
import { Links } from '../imports/api/links';
import { routes, onAuthChange } from '../imports/routes/routes';
import { Session } from 'meteor/session';
import '../imports/startup/simple-schema-configuration';


Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});


Meteor.startup(()=>{
  Session.set('showVisible', true)
  ReactDOM.render(routes, document.getElementById('app'))
});

