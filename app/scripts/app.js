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

      $routeProvider.when('/signIn', {
        templateUrl: 'templates/users/signIn.html',
        controller: 'SignInCtrl'
      }).otherwise({
        templateUrl: 'templates/users/signUp.html',
        controller: 'SignUpCtrl'
      })

    });

}());
