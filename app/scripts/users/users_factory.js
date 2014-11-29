(function () {
  angular.module('myPlanit')
    .factory('UserFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$cookieStore', '$location',
      function (PARSE_HEADERS, PARSE_URI, $http, $cookieStore, $location) {

        var register = function (user) {
          $http.post('https://api.parse.com/1/users', user, PARSE_HEADERS).success( function (data) {
            console.log(data);
          });
        };

        var login = function (user) {
          var params = 'username='+user.username+'&password='+user.password;
          $http.get('https://api.parse.com/1/login/?'+params, PARSE_HEADERS)
            .success( function (data) {
              $cookieStore.put('currentUser', data);
              return checkUser();
            });
        };

        var logout = function () {
          $cookieStore.remove('currentUser');
          return checkUser();
        };

        var checkUser = function (user) {
          var user = $cookieStore.get('currentUser');
          console.log(user);
          if(user !== undefined) {
            $('#user').html('Welcome back ' + user.username);
            $location.path('/main');
          } else {
            $('#user').html('Please Log In');
            $location.path('/');
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
