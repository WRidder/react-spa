/*// Events (as obj or array?)
const events = {
  "incremented": (oldValue, newValue, by) => ({oldValue, newValue, by}),
  "decremented": ["oldValue", "newValue", "by"],
  "misc": ["misc"]
};*/

export default {
  "newsFetch": ["data"],
  "newsFetchFailed": [],
  "newsItemLoaded": ["data"],
  "newsItemFetchFailed": [],

  // user actions
  "loginFailed": ["message"],
  "userLoggedIn": ["id", "name", "email"],
  "userLoggedOut": [],
  
  // Misc
  "countUpdated": ["value"]
};