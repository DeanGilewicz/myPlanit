(function () {
  angular.module('myPlanit')
    .factory('CreateFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$location', '$cookieStore',
      function (PARSE_HEADERS, PARSE_URI, $http, $location, $cookieStore) {

        var currentUser = $cookieStore.get('currentUser');
        var planUrl = PARSE_URI + 'classes/Plans';
        // add a new Plan Object as an array
        function createPlan (plan) {
          // create array
          var planArray = [];
          // add name from form into array
          planArray.push(plan.name);

          // create a Parse Object that will be table header
          var dbObject = {
            // create property: value to be able to store it in this way on Parse
            plans: planArray,
            "user": {
              "__type": "Pointer",
              "className": "_User",
              "objectId": currentUser.objectId
            }
          }
          // save new array to Parse
          $http.post(planUrl, dbObject, PARSE_HEADERS).success( function (data) {
            console.log(data);
          });


          // take user to the plan view
          $location.path('/plan');
        }


        return {
          createPlan: createPlan
        }

      }

    ]);

}());
