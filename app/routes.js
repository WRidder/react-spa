// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
// import { getAsyncInjectors } from 'utils/asyncInjectors';
import gyre from "mainGyre";

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

function requireAuth(nextState, replace) {
  if (!gyre.value("session").loggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default function createRoutes() {
  return [
    {
      path: '/',
      name: 'home',
      getComponent(location, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage')
        ]);

        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      }
    },
    {
      path: '/news',
      name: 'News',
      getComponent(location, cb) {
        const importModules = Promise.all([
          System.import('containers/NewsPage')
        ]);

        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: ':id',
          getComponent(location, cb) {
            const importModules = Promise.all([
              System.import('containers/NewsItemPage')
            ]);

            const renderRoute = loadModule(cb);
            importModules.then(([component]) => {
              renderRoute(component);
            });
            importModules.catch(errorLoading);
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      getComponent(location, cb) {
        const importModules = Promise.all([
          System.import('containers/LoginPage')
        ]);

        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      }
    },
    {
      path: '/about',
      name: "About",
      onEnter: requireAuth,
      getComponent(location, cb) {
        System.import('components/About')
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    }, {
      path: '*',
      name: 'Page not found',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    }
  ];
}
