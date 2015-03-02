"use strict";
var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// Actions
var NavigationActions = require("client/actions/navigationActions");

// Components
var App = require("client/components/app.jsx");
var NotFound = require("client/components/core/notfound.jsx");
var Home = require("client/components/pages/home.jsx");
var About = require("client/components/pages/about.jsx");
var Login = require("client/components/user/login.jsx");
var Signup = require("client/components/user/signup.jsx");
var Profile = require("client/components/user/profile.jsx");
var QuestionList = require("client/components/questions/questionList.jsx");
var Question = require("client/components/questions/question.jsx");
var QuestionNew = require("client/components/questions/questionNew.jsx");
var QuestionNotFound = require("client/components/questions/questionNotFound.jsx");
var Discussions = require("client/components/discussions/discussions.jsx");

// Use a routeobj such that we have an overview of all available routes
var routesObj = {
  component: Route,
  path: "/",
  handler: App,
  crumbTitle: "Home",
  crumbIcon: "mdi mdi-home",
  children: [
    {
      component: DefaultRoute,
      handler: Home
    },
    {
      component: NotFoundRoute,
      handler: NotFound
    },

    // Page routes
    {
      component: Route,
      name: "about",
      path: "/about",
      crumbTitle: "About",
      handler: About
    },

    // Session routes
    {
      component: Route,
      name: "login",
      path: "/login",
      crumbTitle: "Login",
      handler: Login
    },
    {
      component: Route,
      name: "signup",
      path: "/signup",
      crumbTitle: "Signup",
      handler: Signup
    },
    {
      component: Route,
      name: "profile",
      path: "/profile",
      crumbTitle: "Profile",
      handler: Profile
    },

    // Question routes
    {
      component: Route,
      name: "questions",
      path: "/questions",
      crumbTitle: "Questions",
      crumbIcon: "mdi mdi-help-circle",
      handler: QuestionList
    },
    {
      component: Route,
      name: "questionsNew",
      path: "/questions/new",
      handler: QuestionNew
    },
    {
      component: Route,
      name: "question",
      path: "/questions/:questionId",
      handler: Question
    },
    {
      component: Route,
      name: "questionWithTitle",
      path: "/questions/:questionId/:questionTitle",
      handler: Question
    },
    {
      component: Route,
      path: "questions/:questionId/",
      handler: Question
    },
    {
      component: Route,
      name: "question404",
      path: "/questions/404",
      handler: QuestionNotFound
    },

    // Discussion routes
    {
      component: Route,
      crumbTitle: "Discussions",
      crumbIcon: "mdi mdi-account-multiple",
      name: "discussions",
      path: "/discussions",
      handler: Discussions
    }
  ]
};

var recursiveRoutes;
var createRouteElement = function createRouteElement(routesObject) {
  return React.createElement.apply(null,
    [
      routesObject.component,
      {
        name: routesObject.name,
        path: routesObject.path,
        handler: routesObject.handler
      }
    ].concat(recursiveRoutes(routesObject.children))
  );
};

recursiveRoutes = function recursiveRoutes(routeChildren) {
  if (!routeChildren) {
    return [];
  }

  var tmpRoutes = [];
  for (var i = 0; i < routeChildren.length; i++) {
    tmpRoutes.push(createRouteElement(routeChildren[i]));
  }
  return tmpRoutes;
};

var routes = createRouteElement(routesObj);

// Emit routes
NavigationActions.routeUpdate(routesObj);

module.exports = routes;
