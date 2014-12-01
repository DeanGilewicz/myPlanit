(function () {
  angular.module('myPlanit')
    .factory('AccountFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$cookieStore', '$location',
      function (PARSE_HEADERS, PARSE_URI, $http, $cookieStore, $location) {

        var userInfo;
        var usersUrl = PARSE_URI + 'users/';
        var loginUrl = PARSE_URI + 'login/?';

        var signUp = function (user) {
          return $http.post(usersUrl, user, PARSE_HEADERS).success( function (data) {
            console.log(data);
            return login(user); // run login function once signed up
          });
        };

        var login = function (user) {
          var params = 'username='+user.username+'&password='+user.password;
          return $http.get(loginUrl + params, PARSE_HEADERS).success( function (data) {
              $('#loginForm')[0].reset();
              $cookieStore.remove('currentUser');
              $cookieStore.put('currentUser', data);
              return checkUser();
            });
        };

        var logout = function () {
          $cookieStore.remove('currentUser');
          $location.path('/');
          return checkUser();
        };

        var checkUser = function () {
          var user = $cookieStore.get('currentUser');
          console.log(user);
          if(user !== undefined) {
            $('#user').html('Hello ' + user.username);
            $('#logoutBtn').show();
          } else {
            $('#user').html('Log in or sign up');
            $('#logoutBtn').hide();
          }
        };

        return {
          signUp:    signUp,
          login:     login,
          logout:    logout,
          checkUser: checkUser
        }

      }
  ]);

}());
