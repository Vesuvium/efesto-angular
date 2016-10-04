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

    describe('the adduser method', function(){
      it('should be able to create an api user', function(){
        var name = 'Jacopo';
        var password = 'whatever';
        api.addUser(name, password);
        expect(api.users.hasOwnProperty(name)).toBe(true);
        expect(api.users[name].username).toEqual(name);
        expect(api.users[name].password).toEqual(password)
      });
    });

    describe('the addToken method', function(){
      it('should be able to add a token to an user', function(){
        var name = 'jacopo';
        var token = 'python_master_race';
        api.users[name] = {'username': name};
        api.addToken(name, token);
        expect(api.users[name].token).toEqual(token);
      });

      it('should be able to add a token and create an user', function(){
        var name = 'jacopo';
        var token = 'random_bantering';
        api.addToken(name, token);
        expect(api.users[name].token).toEqual(token);
      });
    });

    describe('the getToken method', function(){
      beforeEach(function(){
        this.name = 'jacopo';
        this.token = 'london calling';
      });

      it('should return false when the user does not exist', function(){
        var result = api.getToken(this.name);
        expect(result).toBe(false);
      });

      it('should return false when the user does not have a token', function(){
        api.users[this.name] = {};
        var result = api.getToken(this.name);
        expect(result).toBe(false);
      });

      it('should get an user token', function(){
        api.users[this.name] = {'token': this.token};
        var result = api.getToken(this.name);
        expect(result).toEqual(this.token);
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
