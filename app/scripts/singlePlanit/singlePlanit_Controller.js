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
          // remove search area from view
          // $('#searchResultsArea').detach();
          // // remove category area from view
          // $('#categoryResultsArea').detach();
          SinglePlanitFactory.doSearch(singlePlan).success( function (data) {
            console.log(data);
            $scope.searchResults = data.response.venues;
            console.log($scope.searchResults);
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doTopPicks = function (singlePlan) {
          // remove search area from view
          // $('#searchResultsArea').remove();
          // // remove category area from view
          // $('#categoryResultsArea').remove();
          SinglePlanitFactory.doTopPicks(singlePlan).success( function (data) {
            console.log(data);
            $scope.exploreResults = data.response.groups[0].items;
            console.log($scope.exploreResults);
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doTrending = function (singlePlan) {
          // remove search area from view
          $('#searchResultsArea').remove();
          // remove category area from view
          $('#categoryResultsArea').remove();
          SinglePlanitFactory.doTrending(singlePlan).success( function (data) {
            console.log(data);
            $scope.exploreResults = data.response.groups[0].items;
            console.log($scope.exploreResults);
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doSights = function (singlePlan) {
          // remove search area from view
          $('#searchResultsArea').detach();
          // remove category area from view
          $('#categoryResultsArea').detach();
          SinglePlanitFactory.doSights(singlePlan).success( function (data) {
            console.log(data);
            $scope.exploreResults = data.response.groups[0].items;
            console.log($scope.exploreResults);
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doFood = function (singlePlan) {
          // remove search area from view
          $('#searchResultsArea').remove();
          // remove category area from view
          $('#categoryResultsArea').remove();
          SinglePlanitFactory.doFood(singlePlan).success( function (data) {
            console.log(data);
            $scope.exploreResults = data.response.groups[0].items;
            console.log($scope.exploreResults);
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doDrinks = function (singlePlan) {
          // remove search area from view
          $('#searchResultsArea').remove();
          // remove category area from view
          $('#categoryResultsArea').remove();
          SinglePlanitFactory.doDrinks(singlePlan).success( function (data) {
            console.log(data);
            $scope.exploreResults = data.response.groups[0].items;
            console.log($scope.exploreResults);
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doShops = function (singlePlan) {
          // remove search area from view
          $('#searchResultsArea').remove();
          // remove category area from view
          $('#categoryResultsArea').remove();
          SinglePlanitFactory.doShops(singlePlan).success( function (data) {
            console.log(data);
            $scope.exploreResults = data.response.groups[0].items;
            console.log($scope.exploreResults);
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doArts = function (singlePlan) {
          // remove search area from view
          $('#searchResultsArea').remove();
          // remove category area from view
          $('#categoryResultsArea').remove();
          SinglePlanitFactory.doArts(singlePlan).success( function (data) {
            console.log(data);
            $scope.exploreResults = data.response.groups[0].items;
            console.log($scope.exploreResults);
          });
        }

        // objId is related to what is passed in poiDetails() that have access too
        $scope.poiDetails = function (objId) {
          SinglePlanitFactory.poiDetails(objId).success( function (data) {
            console.log(data);
            $scope.allDetails = data.response.venue;
            $scope.schedule = data.response.venue.popular.timeframes;
            console.log($scope.schedule);
          });
        }

        $scope.addPoi = function (result, categoryResult) {
          // if user inputs a search term
          if(result !== undefined) {
            // poi object (result) is passed in to the func with $scope.singlePlan (which is the current plan object accessible by getOnePlan on controller)
            SinglePlanitFactory.addPoi(result, $scope.singlePlan);
          } else {
            // if user uses a category to search then api returns a different payload so have to dig one level deeper
            var formattedCategoryResult = categoryResult.venue;
            // correcly formatted var is passed into addPoi func in factory
            SinglePlanitFactory.addPoi(formattedCategoryResult, $scope.singlePlan);
          }

        }

        // passing in the plan object, index position, entire plan object
        $scope.deletePoi = function (result, index, singlePlan) {
          // call function to delete poi
          SinglePlanitFactory.deletePoi(result, index, singlePlan).success( function (data) {
            console.log(data);
          });
        }

    }

  ]);

}());
