var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var mui = require("material-ui");
var NavigationStore = require("client/stores/navigation");
var ImmutableRenderMixin = require("react-immutable-render-mixin");
var connect= require("client/libraries/tmp_connect");

var Breadcrumbs = React.createClass({
  mixins: [connect(NavigationStore), ImmutableRenderMixin],
  render: function() {
    // TODO: DRY this up
    var navState = this.state.get("currentState");
    var availableRoutes = this.state.get("availableRoutes");
    var documentTitle = this.state.get("documentTitle");

    var crumbs = (<li className="current" key={-1}><mui.FontIcon className="mdi mdi-home" /><Link to="/">Home</Link></li>);
    if (availableRoutes && navState && documentTitle) {
      if (navState.get("path") != "/" && navState.get("routes").size > 1) {
        crumbs = [];
        var currentRoutes = navState.get("routes").toJSON();
        for (var i = 0; i < currentRoutes.length; i++) {
          var route = currentRoutes[i];

          // Create elements for parent routes
          var subRoutes = route.path.split("/");
          if (subRoutes.length > 1) {

            for (var j = 0; j < subRoutes.length; j++) {
              var subRoute = subRoutes[j];
              if (subRoute.length > 1 && subRoute.charAt(0) !=  ":" && "/" + subRoute != route.path) {
                var subRouteDefinition = availableRoutes.get("children").find(function (v) {
                  return v.get("path") === "/" + subRoute;
                });

                if (subRouteDefinition) {
                  crumbs.push(<li key={i + "+" + j}>{(subRouteDefinition.get("crumbIcon")) ? (<mui.FontIcon className={subRouteDefinition.get("crumbIcon")} />) : null}
                    <Link to={subRouteDefinition.get("path")}>{subRouteDefinition.get("crumbTitle")}</Link>
                  </li>);
                }
              }
            }
          }

          // Get route definition for current route
          var routeDefinition;
          if (availableRoutes.get("path") === route.path) {
            routeDefinition = availableRoutes;
          }
          else {
            routeDefinition = availableRoutes.get("children").find(function (v) {
              return v.get("path") === route.path;
            });
          }

          // Create element
          var crumbClass = (i == currentRoutes.length - 1) ? "current" : null;
          var crumbTitle = ((i == currentRoutes.length - 1) && documentTitle) ? documentTitle : routeDefinition.get("crumbTitle");
          var params = (route.paramNames.length) ? navState.get("params").toJSON() : null;
          crumbs.push(<li className={crumbClass} key={i}>{(routeDefinition.get("crumbIcon")) ? (<mui.FontIcon className={routeDefinition.get("crumbIcon")} />) : null}
            <Link to={route.path} params={params}>{crumbTitle}</Link>
          </li>);
        }
      }
    }

    return (
      <ul className="breadcrumbs">
        {crumbs}
      </ul>
    );
  }
});

module.exports = Breadcrumbs;
