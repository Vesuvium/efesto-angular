(function(){
    angular.module('efesto.angular', []);
})();

(function(){
    'use strict';
    
    angular.module('efesto.angular').factory('api', [function(){
        var api = {};
        
        api.domain = 'http://127.0.0.1:8000';
        api.users = {};
        
        return api;
    }]);
})();
