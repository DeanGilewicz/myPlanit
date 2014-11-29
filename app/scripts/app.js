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

      $routeProvider.when('/user', {
        templateUrl: 'scripts/users/user.html',
        controller: 'UserCtrl'
      });

      $routeProvider.when('/profile', {
        templateUrl: 'scripts/profile/profile.html',
        controller: 'ProfileCtrl'
      });

      $routeProvider.when('/plan', {
        templateUrl: 'scripts/plan/plan.html',
        controller: 'PlanCtrl'
      });

      $routeProvider.when('/existing', {
        templateUrl: 'scripts/newPlanit/newPlanit.html',
        controller: 'NewPlanitCtrl'
      });

      $routeProvider.when('/new', {
        templateUrl: 'scripts/existingPlanit/existingPlanit.html',
        controller: 'ExistingPlanitCtrl'
      });

      $routeProvider.otherwise({
        redirectTo: '/'
      });

    })
    .run(['$rootScope', '$location', 'UserFactory',
      function ($rootScope, $location, UserFactory) {
        $rootScope.$on('$routeChangeStart', function (event) {
          UserFactory.checkUser();
          $(document).foundation();
        });
    }])
    .directive('logOut', function (UserFactory) {
      return {
        link: function ($scope, element, attrs) {
          element.bind('click', function () {
            UserFactory.logout();
          });
        }
      }
    });

}());
