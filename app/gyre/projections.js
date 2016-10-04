export default {
  "topNewsIds": (state = [], evt) => {
    switch (evt.type) {
      case "newsFetch":
        return evt.data;
      default:
        return state;
    }
  },
  "newsItems": {
    initialState: () => ({}),
    events: {
      newsItemLoaded: (state, evt) => {
        const newsItem = {};
        newsItem[evt.data.id] = {
          title: evt.data.title,
          descendants: evt.data.descendants
        };
        
        return Object.assign({}, state, newsItem);
      }
    }
  },
  "session": {
    initialState: () => ({
      loggedIn: false,
      user: {},
      error: null
    }),
    events: {
      userLoggedIn: (state, evt) => {
        return Object.assign({}, state, {
          loggedIn: true,
          user: {
            name: evt.name,
            email: evt.email
          },
          error: null
        });
      },
      userLoggedOut: (state) => {
        return Object.assign({}, state, {
          loggedIn: false,
          user: {},
          error: null
        });
      },
      loginFailed: (state, evt) => {
        return Object.assign({}, state, {
          error: evt.message
        });
      }
    }
  },
  "counter": {
    initialState: () => ({
      value: 0
    }),
    events: {
      countUpdated: (state, evt) => ({
        value: evt.value
      })
    }
  }
};