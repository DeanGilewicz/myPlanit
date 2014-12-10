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
    .constant('PARSE_URI', 'https://api.parse.com/1/')
    .config( function ($routeProvider) {

      $routeProvider.when('/', {
        templateUrl: 'scripts/main/main.html',
        controller: 'MainCtrl'
      });

      $routeProvider.when('/login', {
        templateUrl: 'scripts/account/login.html',
        controller: 'AccountCtrl'
      });

      $routeProvider.when('/signUp', {
        templateUrl: 'scripts/account/signUp.html',
        controller: 'AccountCtrl'
      });

      $routeProvider.when('/profile', {
        templateUrl: 'scripts/profile/profile.html',
        controller: 'ProfileCtrl'
      });

      $routeProvider.when('/create', {
        templateUrl: 'scripts/create/create.html',
        controller: 'CreateCtrl'
      });

      $routeProvider.when('/singlePlanit/:id', {
        templateUrl: 'scripts/singlePlanit/singlePlanit.html',
        controller: 'SinglePlanitCtrl'
      });

      $routeProvider.when('/singleTimeline/:id', {
        templateUrl: 'scripts/singleTimeline/singleTimeline.html',
        controller: 'SingleTimelineCtrl'
      });

      $routeProvider.otherwise({
        redirectTo: '/'
      });

    })
    .run(['$rootScope', '$location', 'AccountFactory',
      function ($rootScope, $location, AccountFactory) {
        $rootScope.$on('$routeChangeStart', function () {
          AccountFactory.checkUser();
        });
    }]);


}());
