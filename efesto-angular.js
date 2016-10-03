(function(){
    angular.module('efesto.angular', []);
})();

(function(){
    'use strict';

    angular.module('efesto.angular').factory('api', ['$http', function($http){
        var api = {};

        api.domain = 'http://127.0.0.1:8000';
        api.users = {};

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
              api.users[user].token = response.data.token;
              api.currentUser = user;
              if (success){
                success(response);
              }
            }
          );
      };

      api._config = function(params){
        /* Builds the requests configuration headers. */
        var config = {};
        if ( api.currentUser ){
          config.headers = {
            'Authorization': 'Basic '+ window.btoa('any:' + decodeURIComponent(api.users[api.currentUser].token))
          };
        }

        if ( params ){
          config.params = params;
        }
        return config;
      };

      api.get = function(endpoint, params, success, failure){
        $http.get( api.domain + endpoint, api._config(params) )
        .then(
          function(response){
            if (success){
              success(response);
            }
          },
          function(response){
            failure(response);
          }
        );
      };

      api.post = function(endpoint, params, success, failure){
        $http.post( api.domain + endpoint, {}, api._config(params))
        .then(
          function(response){
            if (success){
              success(response);
            }
          },
          function(response){
            if (failure){
              failure(response);
            }
          }
        );
      };

      api.patch = function(endpoint, params, success, failure){
        $http.patch( api.domain + endpoint, params, api._config())
        .then(
          function(response){
            if (success){
              success(response);
            }
          },
          function(response){
            if (failure){
              failure(response);
            }
          }
        );
      };

      api.delete = function(endpoint, success, failure){
        $http.delete( api.domain + endpoint, api._config() )
        .then(
          function(response){
            if (success){
              success(response);
            }
          },
          function(response){
            if (failure){
              failure(response);
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
