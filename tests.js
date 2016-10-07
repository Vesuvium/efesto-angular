describe('The api factory', function(){

    var api, http;

    beforeEach(module('efesto.angular'));
    beforeEach(inject(
        function(_api_, $httpBackend){
            http = $httpBackend;
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

    describe('the login method', function(){
      beforeEach(function(){
        api.users.default = {'name': 'default', 'password': 'default'};
        http.when('POST', api.domain + '/auth').respond( {token: 'mytoken'} );
      });

      it('should throw an error when the user does not exist', function(){
        var f = function(){
          api.login('random');
        };
        expect(f).toThrowError("Missing credentials");
      });

      it('should get a token', function(){
        api.login('default');
        http.flush();
        expect(api.users.default.token).toEqual('mytoken');
      });

      it('should allow a success callback', function(){
        var a = false;
        api.login('default', function(){
          a = true;
        });
        http.flush();
        expect(a).toBe(true);
      });

    });

    describe('the headers method', function(){
      it('should return an object', function(){
        expect(api.headers()).toEqual(jasmine.any(Object));
      });

      it('should return the auth header if there is a current user', function(){
        api.users.default = {token: 'mytoken'};
        api.currentUser = 'default';
        var expected = {
          Authorization: 'Basic ' + window.btoa('any:' + decodeURIComponent('mytoken'))
        }
        expect(api.headers()).toEqual(expected);
      });
    });

    describe('the collection method', function(){
      describe('the get action', function(){
        it('should be able to make get requests', function(){
          http.when('GET', api.domain + '/tests').respond({});
          var result = api.collection('tests').get();
          http.flush();
        });

        it('should accept parameters', function(){
          http.when('GET', api.domain + '/tests?randomness=true').respond({});
          var result = api.collection('tests').get({randomness: true});
          http.flush();
        });

        it('should accept a success callback', function(){
          http.when('GET', api.domain + '/tests').respond({});
          var result = false;
          var success = function(response){
            result = true;
          };
          api.collection('tests').get({}, success);
          http.flush();
          expect(result).toBe(true);
        });

        it('should accept a failure callback', function(){
          http.when('GET', api.domain + '/tests').respond(404, {});
          var result = false;
          var failure = function(response){
            result = true;
          };
          api.collection('tests').get({}, function(){}, failure);
          http.flush();
          expect(result).toBe(true);
        });
      });

      describe('the post action', function(){
        it('should be able to make post requests', function(){
          http.when('POST', api.domain + '/tests').respond({});
          api.collection('tests').post();
          http.flush();
        });

        it('should accept parameters', function(){
          http.when('POST', api.domain + '/post').respond({});
          api.collection('post').post({unicorns: 1});
          http.flush();
        });

        it('should accept a success callback', function(){
          http.when('POST', api.domain + '/post').respond({});
          var result = false;
          var success = function(response){
            result = true;
          };
          api.collection('post').post({}, null, success);
          http.flush();
          expect(result).toBe(true);
        });

        it('should accept a failure callback', function(){
          http.when('POST', api.domain + '/post').respond(404, {});
          var result = false;
          var failure = function(response){
            result = true;
          };
          api.collection('post').post({}, null, function(){}, failure);
          http.flush();
          expect(result).toBe(true);
        });

      });
    });
});
