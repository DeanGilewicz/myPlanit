(function () {
  angular.module('myPlanit')
    .controller('SinglePlanitCtrl', ['SinglePlanitFactory', '$routeParams', '$scope',
      function (SinglePlanitFactory, $routeParams, $scope) {

        SinglePlanitFactory.getOnePlan($routeParams.id).success( function (data) {
          console.log(data);
          $scope.singlePlan = data;
        });

        SinglePlanitFactory.getPois().success( function (data) {
          console.log(data);
          $scope.poiList = data.results;
        });

        $scope.doSearch = function () {
          SinglePlanitFactory.doSearch().success( function (data) {
            console.log(data);
            $scope.searchResults = data.response.venues;
            console.log($scope.searchResults);
          });
        }

        $scope.doExplore = function () {
          SinglePlanitFactory.doExplore().success( function (data) {
            console.log(data);
            $scope.exploreResults = data.response.groups[0].items;
            console.log($scope.exploreResults);
          });
        }

        // objId is related to what is passed in poiDetail() that we can have access too
        // result.id gives me access to the id
        $scope.poiDetails = function (objId) {
          SinglePlanitFactory.poiDetails(objId).success( function (data) {
            console.log(data);
            $scope.allDetails = data.response.venue;
            $scope.schedule = data.response.venue.popular.timeframes;
            console.log($scope.schedule);
          });
        }

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
          SinglePlanitFactory.addPoi(result);
          // $rootScope.$on('poi:added', function () {
          //   $location.path('/plan');
          // });
        }

        $scope.deletePoi = function (poiID, index) {
          SinglePlanitFactory.deletePoi(poiID).success( function () {
            $scope.poiList.splice(index, 1);
          });
        }


      }

    ]);

}());
