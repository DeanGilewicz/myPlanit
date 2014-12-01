(function () {
  angular.module('myPlanit')
    .factory('CreateFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http',
      function (PARSE_HEADERS, PARSE_URI, $http) {


        // add a new Plan Object as an array
        function createPlan (plan) {
          var planArray = [];
          planArray.push(plan.name);

          var dbObject = {
            plans: planArray
          }

          $http.post(PARSE_URI + 'classes/Plans', dbObject, PARSE_HEADERS).success( function (data) {
            console.log(data);
          });
        }


        return {
          createPlan: createPlan
        }

      }

    ]);

}());
