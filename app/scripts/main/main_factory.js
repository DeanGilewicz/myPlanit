(function () {
  angular.module('myPlanit')
    .factory('MainFactory', ['PARSE_URI', 'PARSE_HEADERS', '$http', '$rootScope',
      function (PARSE_URI, PARSE_HEADERS, $http, $rootScope) {

        var getPlans = function () {
          return $http.get(PARSE_URI + 'classes/Plans', PARSE_HEADERS);
        };

        return {
          getPlans: getPlans
        }

      }

    ]);

}());
