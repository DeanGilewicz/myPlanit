(function () {
  angular.module('myPlanit')
    .factory('MainFactory', ['PARSE_URI', 'PARSE_HEADERS', '$http', '$rootScope',
      function (PARSE_URI, PARSE_HEADERS, $http, $rootScope) {

        // get all published plans from all users
        var allPublishedPlans = function () {
          // query Parse to retrieve all plans that have the status published
          var params = '?where={"status": "draft"}';
          // return Plans for current user
          return $http.get(PARSE_URI + 'classes/Plans/' + params, PARSE_HEADERS);

        }

        return {
          allPublishedPlans: allPublishedPlans
        }

      }

    ]);

}());
