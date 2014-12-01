(function () {
  angular.module('myPlanit')
    .factory('CreateFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http',
      function (PARSE_HEADERS, PARSE_URI, $http) {


        // add a new Plan Object as an array
        function createPlan (plan) {
          // create array
          var planArray = [];
          // add name from form into array
          planArray.push(plan.name);

          // create a Parse Object that will be table header
          var dbObject = {
            // create property: value to be able to store it in this way on Parse
            plans: planArray
          }
          // save new array to Parse
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
