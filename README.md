# Efesto Angular

Angular sdk for [Efesto](https://github.com/Vesuvium/efesto) that provides
an angular module that handles authentication and requests to an Efesto API.

## Installation

```
npm install efesto-angular
```

## Usage

Set the domain where the api is located:
```
api.domain = 'http://youdomain.com';
```

Set the credentials for an user:
```
api.addUser('myuser', 'password');
```

Login with that user:
```
api.login('myuser', successCallback);
```

Now you can make requests:
```
api.get('/users', {}, successCallback, failureCallback);
```

If you already know your token, such as when using a public user:
```
api.addToken('public', 'mytoken')
api.user.currentUser = 'public';
```
