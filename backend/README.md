node-api-boilerplate
====================

Boilerplate framework for creating secure **or** quick-and-dirty Node.js APIs. Built on Mongoose, Restify, and Passport.

## What security does this framework offer?

This project uses two security schemes to allow for a secure API. It uses [HTTPS to ensure that your traffic cannot be sniffed](http://en.wikipedia.org/wiki/HTTP_Secure), and uses the HTTP Basic Authentication scheme to ensure that legitimate users cannot access endpoints they shouldn't (e.g., another user's personal information).

However, if you would like to use HTTPS in this framework, **you should not use this framework "as-is" in production**. The included OpenSSL certificate found in the cert/ directory is highly insecure (no password), and is self-signed (and therefore untrusted). If this framework will only be used internally, a new self-signed certificate (with a good password) will be fine. In order to create a new self-signed certificate, follow the below steps, in the project's root directory:

    $ rm cert/key.pem cert/certificate.pem
    $ openssl genrsa -out cert/key.pem
    $ openssl req -new -key cert/key.pem -out csr.pem
    $ openssl x509 -req -days 9999 -in csr.pem -signkey cert/key.pem -out cert/certificate.pem
    $ rm csr.pem

If you will be using this framework publicly, you should acquire an externally signed SSL certificate instead.

## What security does this framework **not** offer?

This framework **does not** yet encrypt data that is placed in the database; at this point, it is up to the end user of this framework to ensure that personal information like passwords are stored encrypted. Future updates will hopefully get around to doing this.

This framework **does not** protect against replay attacks. End users will need to derive ways to prevent replay attacks if necessary [(More)](http://en.wikipedia.org/wiki/Replay_attack). Future updates will hopefully get around to doing this.

## "This is for a hackathon project, I don't need security!"

Then this framework is still for you! Just remove the cert/ directory, authenticate.js, and references to Passport.js and cert/ inside server.js.

## Installation

Install Node.js: [http://nodejs.org/download/](http://nodejs.org/download/)

Install MongoDB: [http://www.mongodb.org/downloads/](http://www.mongodb.org/downloads)

Run the following command in this project's root directory:

    $ npm install

## Usage

### Server

    $ mongod &
    $ node server.js

### Sample Client Usage (with authentication but no HTTPS)

    $ echo '{"name": "User Name", "email": "user@email.com", "password": "hunter2"}' > data.json
    $ curl -X POST -isd @data.json http://localhost:8000/users --header "Content-Type:application/json"

    HTTP/1.1 201 Created
    Content-Type: application/json
    ...
    {"id":"534edbe63900bd3a22f18202"}

By default, the server expects authentication to be performed via [basic access authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). The server expects a Base64 encoding of the string "[username]:[password]" in the request header. For example (using the previously returned id):

    Base64("534edbe63900bd3a22f18202:hunter2") == "NTM0ZWRiZTYzOTAwYmQzYTIyZjE4MjAyOmh1bnRlcjI="

Your client will need to implement this processing and encoding (unless you choose an authentication scheme other than basic access authentication).

An example request, with authentication credentials:

    $ curl -H "Authorization: Basic NTM0ZWRiZTYzOTAwYmQzYTIyZjE4MjAyOmh1bnRlcjI=" -X POST -is http://localhost:8000/users/login

    HTTP/1.1 200 OK
    Content-Type: application/json
    ...
    {"name":"User Name","email":"user@email.com"}

Bad requests will be rejected:

    $ curl -H "Authorization: Basic bad-token" -X POST -is http://localhost:8000/users/login

    HTTP/1.1 401 Unauthorized
    WWW-Authenticate: Basic realm="Users"
    ...
    Unauthorized

## Testing

Install mocha globally:

    $ npm install -g mocha

Run mocha tests like so:

    $ mocha

All tests are located within the test/ directory.

## License

The MIT License (MIT) Copyright (c) 2014 Ryan Hansberry @rhansby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
