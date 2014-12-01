(function () {
  angular.module('myPlanit')
    .controller('PlanCtrl', ['PlanFactory', '$scope', '$rootScope', '$location',
      function (PlanFactory, $scope, $rootScope, $location) {

        PlanFactory.getPois().success( function (data) {
          console.log(data);
          $scope.poiList = data.results;
        });

        $scope.addPoi = function (poi) {
          PlanFactory.addPoi(poi);
          // $rootScope.$on('poi:added', function () {
          //   $location.path('/plan');
          // });
        }

        $scope.deletePoi = function (poiID, index) {
          PlanFactory.deletePoi(poiID).success( function () {
            $scope.poiList.splice(index, 1);
          });
        };

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


      }

    ]);

}());
