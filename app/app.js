/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill';
//localStorage.appToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMifQ.ZyilQUer5fhwGiUrjmIVK_JHkKXUXiVrtNNZyEjhHXs";

// Load the manifest.json file and the .htaccess file
import '!file?name=[name].[ext]!./manifest.json';  // eslint-disable-line import/no-unresolved
import 'file?name=[name].[ext]!./.htaccess';      // eslint-disable-line import/no-unresolved

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import gyre from "mainGyre";
gyre.issue("checkAuthToken");

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Set up the router, wrapping all Routes in the App component
const css = []; // CSS for all rendered React components
const context = {
  insertCss: (styles) => {
    if (window) {
      styles._insertCss();
    }
    else {
      css.push(styles._getCss())
    }
  }
};
import App from 'containers/App';
App.prototype.getChildContext = () => context;
App.childContextTypes = {
  insertCss: React.PropTypes.any
};

import createRoutes from './routes';
const rootRoute = {
  component: App,
  childRoutes: createRoutes()
};

ReactDOM.render(
  <Router
    history={browserHistory}
    routes={rootRoute}
    render={
      // Scroll to top when going to a new page, imitating default browser
      // behaviour
      applyRouterMiddleware(useScroll())
    }
  />,
  document.getElementById('app')
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();

// Socket connection
import io from "socket.io-client";
var socket = io('http://localhost:4000/');
socket.on('connect', function () {
  socket.on('counter', function (msg) {
    gyre.trigger("countUpdated", msg.value);
  });
});

// Vue test
import Vue from "vue";

let valObj = gyre.value("counter");
gyre.addListener("counter", data => {
  Object.assign(valObj, data);
});

new Vue({
  el: '#vueApp',
  data: valObj
});