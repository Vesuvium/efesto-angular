describe('The x factory', function(){

    var api;
    
    beforeEach(module('efesto.angular'));
    beforeEach(inject(
        function(_api_){
            api = _api_;
        }
    ));
    
    describe('magic', function(){
        it('should cast', function(){
            expect('0.6.0').toEqual(api.version);
        });
    });
});
