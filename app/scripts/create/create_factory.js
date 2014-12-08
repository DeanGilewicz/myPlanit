(function () {
  angular.module('myPlanit')
    .factory('CreateFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$location', '$cookieStore',
      function (PARSE_HEADERS, PARSE_URI, $http, $location, $cookieStore) {

        // get current coords for user's location
        navigator.geolocation.getCurrentPosition(getLocation);
        // create var so can be used in functions in http requests
        var lat;
        var lng;
        // function to get current lat and lng coordinates
        function getLocation(location) {
          lat = location.coords.latitude;
          lng = location.coords.longitude;
          console.log(lat);
          console.log(lng);
        }

        // create var to use in createPlan function in dbObject
        var currentUser = $cookieStore.get('currentUser');
        console.log(currentUser);
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
            "destination": plan.destination,
            "totalPlanMins": 0,
            "planDate": {
              "__type": "Date",
              "iso": plan.date,
            },
            "status": "private",
            "author": currentUser.username,
            // create array column in db inside of Plans object for pois
            pois: poiArray,
            // create relationship between user and Plan Object
            "user": {
              "__type": "Pointer",
              "className": "_User",
              "objectId": currentUser.objectId
            },
          }
          // save Plan object to Parse
          $http.post(planUrl, dbObject, PARSE_HEADERS).success( function (data) {
            console.log(data);
            // take user to the plan view
            $location.path('/profile');
          });
        }

        // return function so can be called in controller
        return {
          createPlan: createPlan
        }

      }

    ]);

}());
