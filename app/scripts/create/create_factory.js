(function () {
  angular.module('myPlanit')
    .factory('CreateFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http',
      function (PARSE_HEADERS, PARSE_URI, $http) {


        // add a new Plan Object as an array
        function createPlan (plan) {
            $http.post(PARSE_URI + 'classes/Plans', plan, PARSE_HEADERS).success( function (data) {
              console.log(data);
            });
        }


        return {
          createPlan: createPlan
        }

      }

    ]);

}());
