(function () {
  angular.module('myPlanit')
    .controller('SinglePlanitCtrl', ['SinglePlanitFactory', '$routeParams', '$scope',
      function (SinglePlanitFactory, $routeParams, $scope) {

        // call function that uses plan id for route and store the payload in singlePlan (current plan object)
        SinglePlanitFactory.getOnePlan($routeParams.id).success( function (data) {
          console.log(data);
          // set scope so have access to Plan object in other functions in this scope
          $scope.singlePlan = data;
          // set scope for pois contained in Plan object
          $scope.pois = data.pois;
        });

        // call function and store payload returned in searchResults
        $scope.doSearch = function (singlePlan) {
          SinglePlanitFactory.doSearch(singlePlan).success( function (data) {
            console.log(data);
            $scope.searchResults = data.response.venues;
            console.log($scope.searchResults);
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doExplore = function () {
          SinglePlanitFactory.doExplore().success( function (data) {
            console.log(data);
            $scope.exploreResults = data.response.groups[0].items;
            console.log($scope.exploreResults);
          });
        }

        // objId is related to what is passed in poiDetails() that we can have access too
        // result.id gives me access to the id
        $scope.poiDetails = function (objId) {
          SinglePlanitFactory.poiDetails(objId).success( function (data) {
            console.log(data);
            $scope.allDetails = data.response.venue;
            $scope.schedule = data.response.venue.popular.timeframes;
            console.log($scope.schedule);
          });
        }

        // objId is related to what is passed in poiDetails() that we can have access too
        // result.venue.id gives me access to the id
        $scope.poiExDetails = function (objId) {
          SinglePlanitFactory.poiDetails(objId).success( function (data) {
            console.log(data);
            $scope.allDetails = data.response.venue;
            console.log($scope.allDetails);
            $scope.schedule = data.response.venue.popular.timeframes;
            console.log($scope.schedule);
          });
        }

        $scope.addPoi = function (result) {
          // poi object (result) is passed in to the function
          // with $scope.singlePlan (which is the current plan object accessible by getOnePlan on controller)
          SinglePlanitFactory.addPoi(result, $scope.singlePlan);
        }

        // passing in the plan object, index position, entire plan object
        // call function to delete poi
        $scope.deletePoi = function (result, index, singlePlan) {

          SinglePlanitFactory.deletePoi(result, index, singlePlan).success( function (data) {
            console.log(data);
          });
        }

    }

  ]);

}());
