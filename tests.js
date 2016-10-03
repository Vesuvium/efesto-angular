describe('The api factory', function(){

    var api;

    beforeEach(module('efesto.angular'));
    beforeEach(inject(
        function(_api_){
            api = _api_;
        }
    ));

    describe('the default properties', function(){
        it('should have a domain property', function(){
            expect(api.domain).toEqual('http://127.0.0.1:8000');
        });

        it('should have an users property', function(){
            expect(api.users).toEqual(jasmine.any(Object));
        });
    });

    describe('the isAuthenticated method', function(){
      it('should return false when the user is not authenticated', function(){
        var result = api.isAuthenticated('random');
        expect(result).toBe(false);
      });

      it('should return true when the user is the current user', function(){
        api.currentUser = 'random';
        var result = api.isAuthenticated('random');
        expect(result).toBe(true);
      });

      it('should return true when the user has a token', function(){
        api.users.random = {'token':'token'};
        var result = api.isAuthenticated('random');
        expect(result).toBe(true);
      })
    });
});
