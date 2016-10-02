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
});
