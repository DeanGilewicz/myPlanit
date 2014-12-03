(function () {
  angular.module('myPlanit')
    .factory('ExistingPlanitFactory', ['PARSE_URI', 'PARSE_HEADERS', '$http',
      function (PARSE_URI, PARSE_HEADERS, $http) {

        // retrieves a single appt from the server based on id
        var getOnePlan = function (id) {
          return $http.get(PARSE_URI + 'classes/Plans/' + id, PARSE_HEADERS);
        }

        return {
          getOnePlan: getOnePlan
        }

      }

    ]);

}());
