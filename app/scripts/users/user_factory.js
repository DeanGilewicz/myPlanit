(function () {
  angular.module('myPlanit')
    .factory('UserFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$cookieStore', '$location',
      function (PARSE_HEADERS, PARSE_URI, $http, $cookieStore, $location) {

        var register = function (user) {
          $http.post(PARSE_URI + 'users', user, PARSE_HEADERS).success( function (data) {
            console.log(data);
          });
        };

        var login = function (user) {
          var params = 'username='+user.username+'&password='+user.password;
          $http.get(PARSE_URI + 'login/?'+params, PARSE_HEADERS)
            .success( function (data) {
              $cookieStore.put('currentUser', data);
              return checkUser();
            });
        };

        var logout = function () {
          $cookieStore.remove('currentUser');
          $location.path('/');
        };

        var checkUser = function (user) {
          var user = $cookieStore.get('currentUser');
          if(user) {
            $('#user').html('Welcome back ' + user.username);
            // $location.path('/main');
          } else {
            $('#user').html('Please Log In');
            // $location.path('/');
          }
        };

        return {
          login:     login,
          logout:    logout,
          register:  register,
          checkUser: checkUser
        }

      }
  ]);

}());
