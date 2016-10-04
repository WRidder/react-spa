/*// Commands
const commands = {
  "incrementCounter": (gyre, value) => {
    // gyre.getAggregate
    // gyre.issue
    // gyre.trigger
    // gyre.fetch
    gyre.getAggregate("counter")
      .increment(value);
  },
  "decrementCounter": (gyre, value) => {
    gyre.getAggregate("counter")
      .decrement(value);
  },
  increment: "counter",
  decrement: ["counter", {foo: "bar"}]
};
*/

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export default {
  "helloWorld": ({issue, fetch}) => {
    console.log("Hello World!");
  },
  "helloWorldV2": () => {
    console.log("Hello World too!");
  },
  
  // News section
  "loadNews": ({fetch, trigger}) => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        trigger("newsFetch", data.slice(0, 9));
      }).catch(function(error) {
        trigger("newsFetchFailed");
    })
  },
  "loadNewsItem": ({fetch, trigger}, id) => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        trigger("newsItemLoaded", data);
      }).catch(function(error) {
      trigger("newsItemFetchFailed");
    })
  },
  
  // User actions
  logIn: ({fetch, trigger}, email, password) => {
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
      localStorage.appToken = data.token;
      trigger("userLoggedIn", data.id, data.name, data.email);
    })
    .catch(error => {
      trigger("loginFailed", error.toString());
    })
  },
  logOut: ({trigger}) => {
    localStorage.removeItem("appToken");
    trigger("userLoggedOut");
  },
  checkAuthToken: ({trigger}) => {
    console.log("checkAuthToken", localStorage.appToken);
    if (localStorage.appToken) {
      fetch('http://localhost:8000/checkToken', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.appToken}`
        }
      })
        .then(checkStatus)
        .then(parseJSON)
        .then(function(data) {
          localStorage.appToken = data.token;
          trigger("userLoggedIn", data.id, data.name, data.email);
        })
        .catch(error => {
          localStorage.removeItem("appToken");
          trigger("userLoggedOut");
        })
    }
  }
};