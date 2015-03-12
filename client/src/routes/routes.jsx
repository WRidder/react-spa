"use strict";
var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// Actions
var NavigationActions = require("local/actions/navigationActions");

// Components
var App = require("local/components/app.jsx");
var NotFound = require("local/components/core/notfound.jsx");
var Home = require("local/components/pages/home.jsx");
var About = require("local/components/pages/about.jsx");
var Login = require("local/components/user/login.jsx");
var Signup = require("local/components/user/signup.jsx");
var Profile = require("local/components/user/profile.jsx");
var QuestionList = require("local/components/questions/questionList.jsx");
var Question = require("local/components/questions/question.jsx");
var QuestionNew = require("local/components/questions/questionNew.jsx");
var QuestionNotFound = require("local/components/questions/questionNotFound.jsx");
var Discussions = require("local/components/discussions/discussions.jsx");

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
