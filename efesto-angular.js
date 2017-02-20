(function(){
    angular.module('efesto.angular', ['ngResource']);
})();

(function(){
    'use strict';

    angular
        .module('efesto.angular')
        .factory('api', ['$http', '$resource', api]);

        function api($http, $resource) {
            var api = {
                domain: 'http://127.0.0.1:8000',
                users: {},
                addUser: addUser,
                addToken: addToken,
                getToken: getToken,
                login: login,
                headers: headers,
                collection: collection,
                resource: resource,
                isAuthenticated: isAuthenticated
            };
            return api;

            function addUser(name, password) {
                api.users[name] = {'username': name, 'password': password};
            }

            function addToken(user, token) {
                if (api.users.hasOwnProperty(user) === false) {
                    api.users[user] = {};
                }
                api.users[user].token = token;
            }

            function getToken(user) {
                if (api.users.hasOwnProperty(user)){
                    if (api.users[user].hasOwnProperty('token')) {
                        return api.users[user].token;
                    }
                }
                return false;
            }

            function login(user, success, failure) {
                if (api.users.hasOwnProperty(user) === false) {
                    throw Error("Missing credentials");
                }

                $http({
                    method: 'POST',
                    url: api.domain + '/auth',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: 'username=' + api.users[user].username + '&password='+encodeURIComponent(api.users[user].password)
                })
                .then(
                    function(response) {
                        api.addToken(user, response.data.token);
                        api.currentUser = user;
                        if (success) {
                            success(response);
                        }
                    },
                    function(response) {
                        if (failure) {
                            failure(response);
                        }
                    }
                );
            }

            function headers() {
                var headers = {};
                if (api.currentUser) {
                    var token = api.getToken(api.currentUser);
                    var auth = window.btoa('any:' + decodeURIComponent(token));
                    headers.Authorization =  'Basic ' + auth;
                }
                return headers;
            }

            function collection(endpoint) {
                var headers = api.headers();
                return $resource(api.domain + '/' + endpoint, {}, {
                    get: {
                        method: 'GET',
                        headers: headers
                    },
                    post: {
                        method: 'POST',
                        headers: headers
                    }
                });
            }

            function resource(endpoint) {
                var headers = api.headers();
                return $resource(api.domain + '/' + endpoint + '/:id', {id: '@id'}, {
                    patch: {
                        method: 'PATCH',
                        headers: headers
                    },
                    get: {
                        method: 'GET',
                        headers: headers
                    },
                    delete: {
                        method: 'DELETE',
                        headers: headers
                    }
                });
            }

            function isAuthenticated(user) {
                if (api.currentUser === user) {
                    return true;
                }
                if (api.users.hasOwnProperty(user)) {
                    if (api.users[user].token){
                    return true;
                    }
                }
                return false;
            }

        }
})();
