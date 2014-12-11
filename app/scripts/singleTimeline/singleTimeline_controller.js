(function () {
  angular.module('myPlanit')
    .controller('SingleTimelineCtrl', ['SinglePlanitFactory', 'SingleTimelineFactory', '$routeParams', '$scope', '$cookieStore',
      function (SinglePlanitFactory, SingleTimelineFactory, $routeParams, $scope, $cookieStore) {


        // call function that uses plan id for route and store the payload in singlePlan (current plan object)
        SinglePlanitFactory.getOnePlan($routeParams.id).success( function (data) {

          if($cookieStore.get('currentUser').username === data.author) {
            $scope.isAuthor = true;
          } else {
            $scope.isAuthor = false;
          }

          $scope.directions = false;

          // set scope so have access to Plan object in other functions in this scope
          $scope.singlePlan = data;
          // set scope for pois contained in Plan object
          $scope.pois = data.pois;

          $scope.tPM = data.totalPlanMins


// THIS IS THE FUNCTION THAT WILL RUN ON INITIAL LOAD

          // call map function once the single plan object has been returned so can pass this to factory
          SingleTimelineFactory.updateTimes($scope.pois, $scope.singlePlan, $scope.tPM);

        });

        // SAME FUNCTION LINKED TO 3 UPDATE BUTTONS THAT IS SAME FUNCTION THAT RUNS ON INITLAL PAGE LOAD

        // set scope so function can be called in html with ng-click
        $scope.updateTimes = function (pois, singlePlan, tPM) {
          SingleTimelineFactory.updateTimes($scope.pois, $scope.singlePlan, $scope.tPM);
        }


        $scope.updateComments = function (singlePlan) {
          // call function passing in singlePlan
          SingleTimelineFactory.updateComments(singlePlan);
        }

      }

    ]);

}());
