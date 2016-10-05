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

Now you can make requests:
```js
api.get('/users', {}, successCallback, failureCallback);
```

If you already know your token, such as when using a public user:
```js
api.addToken('public', 'mytoken')
api.user.currentUser = 'public';
```
