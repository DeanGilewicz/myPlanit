(function () {
  angular.module('myPlanit')
    .controller('PlanCtrl', ['PlanFactory', '$scope', '$rootScope', '$location',
      function (PlanFactory, $scope, $rootScope, $location) {

        PlanFactory.getPois().success( function (data) {
          console.log(data);
          $scope.poiList = data.results;
        });

        $scope.doSearch = function () {
          PlanFactory.doSearch().success( function (data) {
            console.log(data);
            $scope.searchResults = data.response.venues;
            console.log($scope.searchResults);
          });
        }

        $scope.doExplore = function () {
          PlanFactory.doExplore().success( function (data) {
            console.log(data);
            $scope.searchResults = data.response.groups[0].items;
            console.log($scope.searchResults);
          });
        }

        // objId is related to what is passed in poiDetail() that we can have access too
        // result.id gives me access to the id
        $scope.poiDetails = function (objId) {
          PlanFactory.poiDetails(objId).success( function (data) {
            console.log(data);
            $scope.allDetails = data.response.venue;
            $scope.schedule = data.response.venue.popular.timeframes;
            console.log($scope.schedule);
          });
        }

        $scope.addPoi = function (result) {
          PlanFactory.addPoi(result);
          // $rootScope.$on('poi:added', function () {
          //   $location.path('/plan');
          // });
        }

        $scope.deletePoi = function (objId, index) {
          PlanFactory.deletePoi(objId).success( function () {
            $scope.poiList.splice(index, 1);
          });
        }



      }

    ]);

}());
