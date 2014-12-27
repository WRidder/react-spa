var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Routes = Router.Routes;
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;

// Components
var App = require("client/components/app.jsx");
var NotFound = require("client/components/core/notfound.jsx");
var Home = require("client/components/pages/home.jsx");
var Login = require("client/components/user/login.jsx");
var Signup = require("client/components/user/signup.jsx");
var Profile = require("client/components/user/profile.jsx");
var QuestionList = require("client/components/questions/questionList.jsx");
var Question = require("client/components/questions/question.jsx");
var QuestionNew = require("client/components/questions/questionNew.jsx");
var QuestionNotFound = require("client/components/questions/questionNotFound.jsx");
var Discussions = require("client/components/discussions/discussions.jsx");

    var routes = (
      <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Home}/>
        <NotFoundRoute handler={NotFound}/>

        {/* Session routes */}
        <Route name="login" path="login" handler={Login}/>
        <Route name="signup" path="signup" handler={Signup}/>
        <Route name="profile" path="profile" handler={Profile}/>

        {/* Question routes*/}
        <Route name="questions" path="questions" handler={QuestionList}/>
        <Route name="questionsNew" path="questions/new" handler={QuestionNew}/>
        <Route name="question" path="questions/:questionId" handler={Question}/>
        <Route name="questionWithTitle" path="questions/:questionId/:questionTitle" handler={Question}/>
        <Route path="questions/:questionId/" handler={Question}/>
        <Route name="question404" path="questions/404" handler={QuestionNotFound}/>

        {/* Discussion routes*/}
        <Route name="discussions" handler={Discussions}/>
      </Route>
    );

module.exports = routes;
