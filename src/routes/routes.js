var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Routes = Router.Routes;
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;

// Components
var App = require("./../components/app.jsx");
var NotFound = require("./../components/notfound.jsx");
var Home = require("./../components/home.jsx");
var Login = require("./../components/login.jsx");
var Signup = require("./../components/signup.jsx");
var Profile = require("./../components/profile.jsx");
var QuestionList = require("./../components/questionList.jsx");
var Question = require("./../components/question.jsx");
var QuestionNotFound = require("./../components/notfound/question.jsx");
var Discussions = require("./../components/discussions.jsx");

var routes = (
  <Route name="app" path="/" handler={App}>
    {/* Session routes */}
    <Route name="login" path="login" handler={Login}/>
    <Route name="signup" path="signup" handler={Signup}/>
    <Route name="profile" path="profile" handler={Profile}/>

    {/* Question routes*/}
    <Route name="questions" path="questions" handler={QuestionList}/>
    <Route name="question" path="questions/:questionId" handler={Question}/>
    <Route name="questionWithTitle" path="questions/:questionId/:questionTitle" handler={Question}/>
    <Route path="questions/:questionId/" handler={Question}/>
    <Route name="question404" path="questions/404" handler={QuestionNotFound}/>

    {/* Discussion routes*/}
    <Route name="discussions" handler={Discussions}/>
    <DefaultRoute handler={Home}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
