(function () {
  angular.module('myPlanit')
    .controller('SingleTimelineCtrl', ['SinglePlanitFactory', 'SingleTimelineFactory', '$routeParams', '$scope', '$cookieStore',
      function (SinglePlanitFactory, SingleTimelineFactory, $routeParams, $scope, $cookieStore) {


        // call function that uses plan id for route and store the payload in singlePlan (current plan object)
        SinglePlanitFactory.getOnePlan($routeParams.id).success( function (data) {
          // set scope to hide/disable parts of timeline view depending on user
          if($cookieStore.get('currentUser').username === data.author) {
            $scope.isAuthor = true;
          } else {
            $scope.isAuthor = false;
          }
          // to use for ng-disable
          $scope.directions = false;

          // set scope so have access to Plan object in other functions in this scope
          $scope.singlePlan = data;
          // set scope for pois contained in Plan object
          $scope.pois = data.pois;
          // set scope for total plan minutes contained in Plan object
          $scope.tPM = data.totalPlanMins

          // auto populate map, directions, and times
          SingleTimelineFactory.updateTimes($scope.pois, $scope.singlePlan, $scope.tPM);

        });

        // set scope so function can be called in view by ng-click
        $scope.updateTimes = function (pois, singlePlan, tPM) {
          SingleTimelineFactory.updateTimes($scope.pois, $scope.singlePlan, $scope.tPM);
        }


        $scope.updateComments = function (singlePlan) {
          // call function passing in singlePlan
          SingleTimelineFactory.updateComments(singlePlan).success( function() {
            alert('comments have been updated');
          });
        }

      }

    ]);

}());
