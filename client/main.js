import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Router, Route, browserHistory } from 'react-router';

// REACT COMPONENTS
import App from '../imports/ui/App';
import GetHelp from '../imports/ui/GetHelp';
import Services from '../imports/ui/Services';
import Emergency from '../imports/ui/Emergency';
import Donate from '../imports/ui/Donate';
import NotFound from '../imports/ui/NotFound';


// API DATA
import {assistance} from '../imports/api/assistance';


const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/help" component={GetHelp} />
    <Route path="/services" component={Services} />
    <Route path="/emergency" component={Emergency} />
    <Route path="/donate" component={Donate} />
    <Route path="*" component={NotFound} />
  </Router>
);

// assistance();

Meteor.startup(() => {
  Tracker.autorun(() => {
    ReactDOM.render(routes, document.getElementById('app'));
  });
});
