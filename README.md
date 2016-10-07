# Efesto Angular

Angular sdk for [Efesto](https://github.com/Vesuvium/efesto) that provides
an angular module that handles authentication and requests to an Efesto API.

## Installation

Install using npm:
```
npm install efesto-angular
```

Then load the module:
```js
angular.module('myapp', ['efesto.angular']);
```

## Usage

Set the domain where the api is located:
```js
api.domain = 'http://youdomain.com';
```

Set the credentials for an user:
```js
api.addUser('myuser', 'password');
```

Login with that user:
```js
api.login('myuser', successCallback);
```

Now you can make requests to collections:
```js
/* Get list of users */
var users = api.collection('users');
users.get({rank: 1}, successCallback, failureCallback);

/* New user */
var myUser = {name: 'myself', rank: 1, email: 'mail', password: 'passwd'};
users.post(myUser, null, successCallback, failureCallback);
```

To resources:
```js
var user = api.resource('users');
/* Get user with id 7 */
user.get({id: 7}, successCallback, failureCallback);

/* Update user #7's name */
user.patch({id: 7, name: 'newname'}, successCallback, failureCallback);

/* Delete user #7 */
user.delete({id: 7}, successCallback, failureCallback);
```

If you already know your token, such as when using a public user:
```js
api.addToken('public', 'mytoken')
api.user.currentUser = 'public';
```
