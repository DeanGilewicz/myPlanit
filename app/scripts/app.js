(function () {
  angular
    .module('myPlanit', ['ngRoute', 'ngCookies'])
    .constant('PARSE_HEADERS', {
      headers: {
        'X-Parse-Application-Id': 'wvEHbeISgGi5kyLg34XHLNqp3qZh3ctIphNuZgOJ',
        'X-Parse-REST-API-Key': 'TLEXyBAkMBlBuksckr0843NmZlu8Q3LB2B9jCc4Q',
        'Content-Type': 'application/json'
      }
    })
    .constant('PARSE_URI', 'https://api.parse.com/1/classes/myPlanit/')
    .config( function ($routeProvider) {

      $routeProvider.when('/', {
        templateUrl: 'scripts/main/main.html',
        controller: 'MainCtrl'
      });

      $routeProvider.when('/user', {
        templateUrl: 'scripts/users/user.html',
        controller: 'UserCtrl'
      });

      $routeProvider.otherwise({
        redirectTo: '/'
      });

    });

}());
