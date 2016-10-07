(function(){
    angular.module('efesto.angular', []);
})();

(function(){
    'use strict';

    angular.module('efesto.angular').factory('api', ['$http', function($http){
        var api = {};

        api.domain = 'http://127.0.0.1:8000';
        api.users = {};

        api.addUser = function(name, password){
          api.users[name] = {'username': name, 'password': password};
        };

        api.addToken = function(user, token){
          if (api.users.hasOwnProperty(user) === false){
            api.users[user] = {};
          }
          api.users[user].token = token;
        };

        api.getToken = function(user){
          if (api.users.hasOwnProperty(user)){
            if (api.users[user].hasOwnProperty('token')){
              return api.users[user].token;
            }
          }
          return false;
        };

        api.login = function(user, success){
          if (api.users.hasOwnProperty(user) === false){
            throw Error("Missing credentials");
          }

          $http({
            method: 'POST',
            url: api.domain + '/auth',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'username=' + api.users[user].username + '&password='+encodeURIComponent(api.users[user].password)
          })
          .then(
            function(response){
              api.addToken(user, response.data.token);
              api.currentUser = user;
              if (success){
                success(response);
              }
            }
          );
      };

      api.isAuthenticated = function(user){
        if (api.currentUser === user){
          return true;
        }
        if (api.users.hasOwnProperty(user)){
          if (api.users[user].token){
            return true;
          }
        }
        return false;
      };

      return api;
    }]);
})();
