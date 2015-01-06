# Community site SPA based on ReactJS (PoC)
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/WRidder/react-spa?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/WRidder/react-spa.svg?branch=master)](https://travis-ci.org/WRidder/react-spa)

A Proof of Concept real-time single page application based on React and (Re)flux to discover best practices regarding a multitude of use cases. Contains a simple server with in-memory database in `./server`.

[**Demo on heroku**](http://stormy-lake-7478.herokuapp.com/)

### Installation
1. Run `$ npm install` in the base and in the ./server directory
2. Run `$ bower install` in the base directory
3. Start the server in ./server using `$ node src/server.js`. Should open a port on 8080.
4. **[optional]** Install gulp globally using `npm install -g gulp`
5. Run `$ gulp` in the base directory. This will watch for file changes and build when necessary.
6. Navigate your browser to http://localhost:8080; will reload on client changes.

Tested using npm 2.1.0 and node 0.10.33

### Current state
* Discovery
* > **Proof of concept** <
* Refactoring
* Stabilizing

### Goal
Create a more advanced example (w.r.t. your average TODO app) of creating a SPA using ReactJS. Initially as a personal exercise to go *through the mud* once while hoping to share new insights gained during the process and discuss various approaches. 

This will be by no means a production ready application. Objectives and goals are subject to change.

#### Primary objectives
* Find sensible approaches to using reactjs with (re)flux
* Scalable solutions (both in size and regarding developers)
* Isomorphic application
* Tests (unit, integration and functional) for all essential components
* Build methods
* Realtime connections
* File/folder layout

#### Secondary objectives
* Load modules on demand
* SEO 
* Accessibility

### Application design
#### Features
* User login and registration
* Forum-like discussions
* Realtime connections
* Stackoverflow-like questions
* Chat
* Updates

#### Roles
* Guest
  * Can view public pages
  * Can login
  * Can create account
* User
  * Can view restricted pages
  * Can create questions, discussions and comments. 
  * Can delete own comments
* Moderator
  * Can delete comments, discssions and comments from other users
* Administrator

#### Layout
**Home page**
```
+---------------------------------------------------------------------------+
| Logo                                                 Account   Updates(5) |
| +----------+ +-----------+ +-------------+  +-------------+ +-----------+ |
| | Home     | | Questions | | Discussions |  | About       | | Chat      | |
| +----------+ +-----------+ +-------------+  +-------------+ +-----------+ |
|                                                                           |
+---------------------------------------------------------------------------+
|  Homepage                                                                 |
|                                                                           |
|                            List of updates                                |
|                                                                           |
+---------------------------------------------------------------------------+
|(c) notice                                                                 |
+---------------------------------------------------------------------------+
```
### Libraries
* [ReactJS](https://facebook.github.io/react/)
* [Reflux](https://github.com/spoike/refluxjs)
* [React-router](https://github.com/rackt/react-router/)
* [ImmutableJS](https://github.com/facebook/immutable-js)
* [Material-ui](https://github.com/callemall/material-ui)
* [SocketIO](http://socket.io/)

### Foundations
* [React starter kit](https://github.com/kriasoft/react-starter-kit)

### Resources
#### Blogs
* [krawaller.se](http://blog.krawaller.se/)
* [spoike.ghost.io](http://spoike.ghost.io/)

#### Discussions
* [Google ReactJS group](https://groups.google.com/forum/#!forum/reactjs)
* [ReactJS subreddit](https://www.reddit.com/r/reactjs/search?q=reactjs&sort=relevance&restrict_sr=on&t=all)

#### Books
* [Developing a React.js Edge](http://shop.oreilly.com/product/9781939902122.do)

### Changelog
**[01-dec-14]** Improving isomorphic rendering  
**[30-nov-14]** Isomorphic app support  
**[24-nov-14]** Sessions (login/logout/profile); html5 puhsState; single server  
**[22-nov-14]** Initial version
