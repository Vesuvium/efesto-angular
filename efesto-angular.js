(function(){
    angular.module('efesto.angular', []);
})();

(function(){
    'use strict';
    
    angular.module('efesto.angular').factory('api', [function(){
        var api = {};
        
        api.version = '0.6.0';
        
        return api;
    }]);
})();
