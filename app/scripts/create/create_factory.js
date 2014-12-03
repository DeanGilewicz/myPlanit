(function () {
  angular.module('myPlanit')
    .factory('CreateFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$location', '$cookieStore',
      function (PARSE_HEADERS, PARSE_URI, $http, $location, $cookieStore) {

        // create var to use in createPlan function in dbObject
        var currentUser = $cookieStore.get('currentUser');
        // create var to keep code cleaner when post
        var planUrl = PARSE_URI + 'classes/Plans';

        // add a new Plan Object as an array
        function createPlan (plan) {
          // create an empty array
          var poiArray = [];
          // create a Parse Object that will be table header
          var dbObject = {
            // create property: value pairs to be able to store it in this way on Parse
            "planName": plan.name,
            "planDate": {
              "__type": "Date",
              "iso": plan.date
            }, // create array column in db inside of Plans object for pois
            pois: poiArray,
            "user": {
              "__type": "Pointer",
              "className": "_User",
              "objectId": currentUser.objectId
            }// create relationship between user and Plan Object
          }
          // save Plan object to Parse
          $http.post(planUrl, dbObject, PARSE_HEADERS).success( function (data) {
            console.log(data);
            // take user to the plan view
            $location.path('/plan');
          });
        }

        // return function so can be called in controller
        return {
          createPlan: createPlan
        }

      }

    ]);

}());
