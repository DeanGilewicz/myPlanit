(function () {
  angular.module('myPlanit')
    .factory('AccountFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$cookieStore', '$location',
      function (PARSE_HEADERS, PARSE_URI, $http, $cookieStore, $location) {

        var usersUrl = PARSE_URI + 'users/';
        var loginUrl = PARSE_URI + 'login/?';

        var signUp = function (user) {
          return $http.post(usersUrl, user, PARSE_HEADERS).success( function (data) {
            console.log(data);
            return login(user); // run login function once signed up
          });
        }

        var login = function (user) {
          var params = 'username='+user.username+'&password='+user.password;
          return $http.get(loginUrl + params, PARSE_HEADERS).success( function (data) {
              $cookieStore.remove('currentUser');
              $cookieStore.put('currentUser', data);
              $location.path('/profile')
            });
        }

        var logout = function () {
          var user = $cookieStore.remove('currentUser');
          $location.path('/');
        }

        var checkUser = function () {
          var user = $cookieStore.get('currentUser');
          if(user) {
            $('#user').html('Hello ' + user.username);
          } else {
            $('#user').html('Log in or sign up');
          }
        }


        return {
          signUp:    signUp,
          login:     login,
          logout:    logout,
          checkUser: checkUser
        }

      }
  ]);

}());
