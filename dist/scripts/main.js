(function () {
  angular
    .module('myPlanit', ['ngRoute', 'ngCookies'])
    .constant('PARSE_HEADERS', {
      headers: {
        'X-Parse-Application-Id': 'wvEHbeISgGi5kyLg34XHLNqp3qZh3ctIphNuZgOJ',
        'X-Parse-REST-API-Key': 'TLEXyBAkMBlBuksckr0843NmZlu8Q3LB2B9jCc4Q',
        'Content-Type': 'application/json'
      }
    })
    .constant('PARSE_URI', 'https://api.parse.com/1/')
    .config( function ($routeProvider) {

      $routeProvider.when('/', {
        templateUrl: 'scripts/main/main.html',
        controller: 'MainCtrl'
      });

      $routeProvider.when('/login', {
        templateUrl: 'scripts/account/login.html',
        controller: 'AccountCtrl'
      });

      $routeProvider.when('/signUp', {
        templateUrl: 'scripts/account/signUp.html',
        controller: 'AccountCtrl'
      });

      $routeProvider.when('/profile', {
        templateUrl: 'scripts/profile/profile.html',
        controller: 'ProfileCtrl'
      });

      $routeProvider.when('/create', {
        templateUrl: 'scripts/create/create.html',
        controller: 'CreateCtrl'
      });

      $routeProvider.when('/singlePlanit/:id', {
        templateUrl: 'scripts/singlePlanit/singlePlanit.html',
        controller: 'SinglePlanitCtrl'
      });

      $routeProvider.when('/singleTimeline/:id', {
        templateUrl: 'scripts/singleTimeline/singleTimeline.html',
        controller: 'SingleTimelineCtrl'
      });

      $routeProvider.otherwise({
        redirectTo: '/'
      });

    })
    .run(['$rootScope', '$location', 'AccountFactory',
      function ($rootScope, $location, AccountFactory) {
        $rootScope.$on('$routeChangeStart', function () {
          AccountFactory.checkUser();
          // Set Up Our Foundation
          $(document).foundation();
        });
    }]);


}());

(function () {
  angular.module('myPlanit')
    .controller('MainCtrl', ['MainFactory', '$rootScope', '$scope',
      function (MainFactory, $rootScope, $scope) {

        // call fucntion to get plans by current user
        MainFactory.allPublishedPlans().success( function (data) {
          // set scope so can be accessed
          $scope.allPublishedPlans = data.results;
        });

      }

    ]);

}());

(function () {
  angular.module('myPlanit')
    .factory('MainFactory', ['PARSE_URI', 'PARSE_HEADERS', '$http', '$rootScope',
      function (PARSE_URI, PARSE_HEADERS, $http, $rootScope) {

        // get all published plans from all users
        var allPublishedPlans = function () {
          // query Parse to retrieve all plans that have the status published
          var params = '?where={"status": "published"}';
          // return Plans for current user
          return $http.get(PARSE_URI + 'classes/Plans/' + params, PARSE_HEADERS);

        }

        return {
          allPublishedPlans: allPublishedPlans
        }

      }

    ]);

}());

(function () {
  angular.module('myPlanit')
    .controller('AccountCtrl', ['AccountFactory', '$scope', '$cookieStore',
      function (AccountFactory, $scope, $cookieStore) {

        $scope.signUp = function (user) {
          AccountFactory.signUp(user);
        };

        $scope.login = function (user) {
          AccountFactory.login(user);
        };

        // directive is being run for logout button, which is linked to factory
        $scope.logout = function () {
          AccountFactory.logout();
        };

        // set current username so can be accessed
        var checkUser = function () {
          var currentUser = $cookieStore.get('currentUser');
          if(currentUser !== undefined) {
            $scope.currentUsername = true;
          }
        }
        checkUser();
      }
    ]);

}());

(function () {
  angular.module('myPlanit')
    .factory('AccountFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$cookieStore', '$location',
      function (PARSE_HEADERS, PARSE_URI, $http, $cookieStore, $location) {

        var usersUrl = PARSE_URI + 'users/';
        var loginUrl = PARSE_URI + 'login/?';

        var signUp = function (user) {
          return $http.post(usersUrl, user, PARSE_HEADERS).success( function (data) {
            return login(user); // run login function once signed up
          });
        }

        var login = function (user) {
          var params = 'username='+user.username+'&password='+user.password;
          return $http.get(loginUrl + params, PARSE_HEADERS).success( function (data) {
              $cookieStore.remove('currentUser');
              $cookieStore.put('currentUser', data);
              $location.path('/profile');
              location.reload();
            });
        }

        var logout = function () {
          var user = $cookieStore.remove('currentUser');
          $location.path('/');
        }

        var checkUser = function () {
          var user = $cookieStore.get('currentUser');
          if(user) {
            $('#user').html('Hello ' + user.username);
          }
        }

        return {
          signUp:    signUp,
          login:     login,
          logout:    logout,
          checkUser: checkUser
        }

      }
  ]);

}());

(function () {
  angular.module('myPlanit')
    .controller('ProfileCtrl', ['ProfileFactory', '$scope', '$cookieStore',
      function (ProfileFactory, $scope, $cookieStore) {

        // call fucntion to get plans by current user
        ProfileFactory.plansByUser().success( function (data) {
          // set scope so can be accessed
          $scope.userPlans = data.results;
        });

        // set current username so can be accessed
        $scope.currentUsername = $cookieStore.get('currentUser').username;

        // call func to update status of the plan so will either show or won't show on homepage
        $scope.updatePlanStatus = function (plan, userPlans) {
          // update status for specific plan when button is clicked
            if(plan.status === 'private') {
              plan.status = 'published';
            } else {
              plan.status = 'private';
            }
          // call func
          ProfileFactory.updatePlanStatus(plan, userPlans);
        }

        // call func to delete user plan - only on success visually update view to remove plan
        $scope.deleteUserPlan = function (plan) {
          // call func delete user passing in the specific plan
          ProfileFactory.deleteUserPlan(plan).success( function () {
            // remove the poi based on it's obj id (list in view)
            $('li#' + plan.objectId).remove();
          });

        }
    }

  ]);

}());

(function () {
  angular.module('myPlanit')
    .factory('ProfileFactory', ['PARSE_URI', 'PARSE_HEADERS', '$http', '$cookieStore',
      function (PARSE_URI, PARSE_HEADERS, $http, $cookieStore) {

        // get all plans for specific user
        var plansByUser = function () {
          // set var for current user
          var currentUser = $cookieStore.get('currentUser');
          // query Parse to look up user column (which is a type pointer in _User with matching id)
          var params = '?where={"user":{"__type":"Pointer","className":"_User","objectId":"'+ currentUser.objectId +'"}}';
          // return Plans for current user
          return $http.get(PARSE_URI + 'classes/Plans/' + params, PARSE_HEADERS);
        }

        // function to update status of plan to either draft (personal) or publish (public)
        var updatePlanStatus = function (plan, userPlans) {
          // update parse to reflect updated status
          return $http.put(PARSE_URI + 'classes/Plans/' + plan.objectId, plan, PARSE_HEADERS);
        }

        // function to delete a plan from user plans
        var deleteUserPlan = function (plan) {
          // delete plan from Parse
          return $http.delete(PARSE_URI + 'classes/Plans/' + plan.objectId, PARSE_HEADERS);
        }


        return {
          plansByUser:      plansByUser,
          updatePlanStatus: updatePlanStatus,
          deleteUserPlan:   deleteUserPlan
        }

      }

    ]);

}());

(function () {
  angular.module('myPlanit')
    .controller('CreateCtrl', ['CreateFactory', '$scope',
      function (CreateFactory, $scope) {

        $scope.createPlan = function (plan) {
          CreateFactory.createPlan(plan);
          // $location.path('/plan');
        }

      }

    ]);

}());

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
        }

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
            "destination": plan.destination,
            "totalPlanMins": 0,
            "planDate": {
              "__type": "Date",
              "iso": plan.date,
            },
            "status": "private",
            "notes": "",
            "comments": "",
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

(function () {
  angular.module('myPlanit')
    .controller('SinglePlanitCtrl', ['SinglePlanitFactory', '$routeParams', '$scope',
      function (SinglePlanitFactory, $routeParams, $scope) {

        // call function that uses plan id for route and store the payload in singlePlan (current plan object)
        SinglePlanitFactory.getOnePlan($routeParams.id).success( function (data) {
          // set scope so have access to Plan object in other functions in this scope
          $scope.singlePlan = data;
          // set scope for pois contained in Plan object
          $scope.pois = data.pois;
          // make sure foundation is ready so modal can be viewed
          $(document).foundation();
        });

        // call function and store payload returned in searchResults
        $scope.doSearch = function (singlePlan) {
          // create scope to use to in ng-show in html to show/hide areas
          $scope.isSearchArea = true;
          $scope.isCategoryArea = false;

          SinglePlanitFactory.doSearch(singlePlan).success( function (data) {
            var check = data.response.venues;
            if(check == []) {
              swal('sorry nothing found');
            } else {
              $scope.searchResults = data.response.venues;
            }
            $('.userSearch')[0].reset();
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doTopPicks = function (singlePlan) {
          // create scope to use to in ng-show in html to show/hide areas
          $scope.isSearchArea = false;
          $scope.isCategoryArea = true;

          SinglePlanitFactory.doTopPicks(singlePlan).success( function (data) {
            $scope.exploreResults = data.response.groups[0].items;
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doTrending = function (singlePlan) {
          // create scope to use to in ng-show in html to show/hide areas
          $scope.isSearchArea = false;
          $scope.isCategoryArea = true;

          SinglePlanitFactory.doTrending(singlePlan).success( function (data) {
            $scope.exploreResults = data.response.groups[0].items;
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doSights = function (singlePlan) {
          // create scope to use to in ng-show in html to show/hide areas
          $scope.isSearchArea = false;
          $scope.isCategoryArea = true;

          SinglePlanitFactory.doSights(singlePlan).success( function (data) {
            $scope.exploreResults = data.response.groups[0].items;
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doFood = function (singlePlan) {
          // create scope to use to in ng-show in html to show/hide areas
          $scope.isSearchArea = false;
          $scope.isCategoryArea = true;

          SinglePlanitFactory.doFood(singlePlan).success( function (data) {
            $scope.exploreResults = data.response.groups[0].items;
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doDrinks = function (singlePlan) {
          // create scope to use to in ng-show in html to show/hide areas
          $scope.isSearchArea = false;
          $scope.isCategoryArea = true;

          SinglePlanitFactory.doDrinks(singlePlan).success( function (data) {
            $scope.exploreResults = data.response.groups[0].items;
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doShops = function (singlePlan) {
          // create scope to use to in ng-show in html to show/hide areas
          $scope.isSearchArea = false;
          $scope.isCategoryArea = true;

          SinglePlanitFactory.doShops(singlePlan).success( function (data) {
            $scope.exploreResults = data.response.groups[0].items;
          });
        }

        // call function and store payload returned in exploreResults
        $scope.doArts = function (singlePlan) {
          // create scope to use to in ng-show in html to show/hide areas
          $scope.isSearchArea = false;
          $scope.isCategoryArea = true;

          SinglePlanitFactory.doArts(singlePlan).success( function (data) {
            $scope.exploreResults = data.response.groups[0].items;
          });
        }

        // objId is related to what is passed in poiDetails() that have access too
        $scope.poiDetails = function (objId) {
          // create scope to use to in ng-show in html to show details
          $scope.showDetails = true;

          SinglePlanitFactory.poiDetails(objId).success( function (data) {
            $scope.allDetails = data.response.venue;
            $scope.schedule = data.response.venue.popular.timeframes;
          });
        }

        $scope.addPoi = function (result, categoryResult) {
          // create scope to use to in ng-show in html to hide areas when poi add button is clicked
          $scope.showDetails = false;
          $scope.isSearchArea = false;
          $scope.isCategoryArea = false;

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
          SinglePlanitFactory.deletePoi(result, index, singlePlan);
        }

        $scope.updateNotes = function (singlePlan) {
          // call function passing in singlePlan
          SinglePlanitFactory.updateNotes(singlePlan).success( function () {
            swal("done", "notes have been updated", "success");
          });
        }

    }

  ]);

}());

(function () {
  angular.module('myPlanit')
    .factory('SinglePlanitFactory', ['PARSE_URI', 'PARSE_HEADERS', '$http',
      function (PARSE_URI, PARSE_HEADERS, $http) {

        // retrieves a single Plan from the server based on id
        var getOnePlan = function (id) {
          return $http.get(PARSE_URI + 'classes/Plans/' + id, PARSE_HEADERS);
        }
        // TO CONVERT USER LOCATION INTO ADDRESS TO DISPLAY ON VIEW
        // $http.get('https:maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCrNC4AETKT_7FVqnWvNuUy-fLn9zYTUHc').success(function (data) {
        //   console.log(data);
        // });

        // function for search to tied to Search button that uses search term entered by user
        var doSearch = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            alert('please enter something to search for');
          } else {
            return $http.get('https://api.foursquare.com/v2/venues/search?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&near='+dest+'&query='+$('#query').val()+'');
          }
        }

        // function for explore tied to Top Picks button
        var doTopPicks = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=topPicks');
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Trending button
        var doTrending = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=trending');
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Sights button
        var doSights = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=sights');
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Food button
        var doFood = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=food');
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Drinks button
        var doDrinks = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=drinks');
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Shops button
        var doShops = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=shops');
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Arts button
        var doArts = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=arts');
          } else {
            alert('please remove search term and try again');
          }
        }

        // function to get details for each poi returned from search results
        var poiDetails = function (objId) {
          return $http.get('https://api.foursquare.com/v2/venues/' + objId + '?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806');
        }
        // function to get details for each poi returned from explore results
        var poiExDetails = function (objId) {
          return $http.get('https://api.foursquare.com/v2/venues/' + objId + '?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806');
        }

        // add a poi to "plan" list - result is the poi object, singlePlan is the current Plan object
        var addPoi = function (result, singlePlan) {
          // push the object into the pois table in the current Plan object
          singlePlan.pois.push({ name: result.name, id: result.id, allottedTime: 0, lat: result.location.lat, lng: result.location.lng });
          // update the array with the new object singlePlan
          $http.put(PARSE_URI + 'classes/Plans/' + singlePlan.objectId, singlePlan, PARSE_HEADERS);
        }

        // delete single poi
        var deletePoi = function (result, index, singlePlan) {
          // splice the object from the array inside of pois inside of singlePlan Object
          singlePlan.pois.splice(index, 1);
          // update the singlePlan object in Parse with new singlePlan object
          return $http.put(PARSE_URI + 'classes/Plans/' + singlePlan.objectId, singlePlan, PARSE_HEADERS);
        }

        var updateNotes = function (singlePlan) {
          // update on Parse the specifiic plan's notes
          return $http.put(PARSE_URI + 'classes/Plans/' + singlePlan.objectId, singlePlan, PARSE_HEADERS);
        }

        return {
          getOnePlan:     getOnePlan,
          doSearch:       doSearch,
          doTopPicks:     doTopPicks,
          doTrending:     doTrending,
          doSights:       doSights,
          doFood:         doFood,
          doDrinks:       doDrinks,
          doShops:        doShops,
          doArts:         doArts,
          poiDetails:     poiDetails,
          poiExDetails:   poiExDetails,
          addPoi:         addPoi,
          deletePoi:      deletePoi,
          updateNotes:    updateNotes
        }

      }

    ]);

}());

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
            swal("done", "comments have been updated", "success");
          });
        }

      }

    ]);

}());

(function () {
  angular.module('myPlanit')
    .factory('SingleTimelineFactory', ['PARSE_URI', '$http', 'PARSE_HEADERS',
      function (PARSE_URI, $http, PARSE_HEADERS) {

        // set variables to accessible
        var poiLat;
        var poiLng;
        var poiLatLng;
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService(); // instantiate a directions service

        var updateTimes = function (pois, singlePlan, tPM) {
          // update on Parse the specifiic plan's totalPlanMins
          return $http.put(PARSE_URI + 'classes/Plans/' + singlePlan.objectId, singlePlan, PARSE_HEADERS).success( function(data) {
                // instantiate a directions renderer
                directionsDisplay = new google.maps.DirectionsRenderer();
                // create a new google maps latlng object with first poi's lat and lng
                var firstPoi = new google.maps.LatLng(pois[0].lat, pois[0].lng);
                // set mapOptions
                var mapOptions = {
                  // center map based on first poi coords
                  center: firstPoi,
                  zoom: 8,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                // create map using mapOptions and show in elemennt with id
                var poiMap = new google.maps.Map(document.getElementById('map-pois'), mapOptions);
                // bind directions service to poiMap
                directionsDisplay.setMap(poiMap);
                // _.each to loop through all of the poi ojects
                _.each(pois, function (poi) {
                  // set value of poiLat and poiLng
                  poiLat = poi.lat;
                  poiLng = poi.lng;
                  // create a new google maps latlng object with all poi lat and lng
                  poiLatLng = new google.maps.LatLng(poiLat, poiLng);
                  // generate markers for each poi using their coords and placing on poiMap
                  // new google.maps.Marker({
                  //   position: poiLatLng,
                  //   map: poiMap
                  // });
                }); // end of _.each func
                // create a new google maps traffic layout object
                var trafficLayer = new google.maps.TrafficLayer();
                // allows toggle to show traffic when button clicked
                $('#toggle_traffic').click( function () {
                  if(trafficLayer.getMap()) {
                    trafficLayer.setMap(null);
                  } else {
                    trafficLayer.setMap(poiMap);
                  }
                });// end of traffic func

                // display step by step directions
                directionsDisplay.setPanel(document.getElementById("directionsPanel"));
                // call func to automatically generate directions between all pois

                // Maps API allows a max of 8 waypoints for personal. Business customers are allowed 23 waypoints, plus the origin, and destination.

                // get the first obj in pois array
                var firstPoi = _.first(pois);
                // set the lat for first obj
                var firstPoiLat = firstPoi.lat;
                // set the lng for first obj
                var firstPoiLng = firstPoi.lng;
                // create a new google maps latlng object with first obj's lat lng coords
                var firstPoiLatLng = new google.maps.LatLng(firstPoiLat, firstPoiLng);
                // get the last obj in pois array
                var lastPoi = _.last(pois);
                // set the lat for last obj
                var lastPoiLat = lastPoi.lat;
                // set the lng for last obj
                var lastPoiLng = lastPoi.lng;
                // create a new google maps latlng object with last obj's lat lng coords
                var lastPoiLatLng = new google.maps.LatLng(lastPoiLat, lastPoiLng);
                // get all obj's but the first one in pois array
                var allButFirstPoi = _.rest(pois, 1);
                // get all obj's but the last one in pois array
                var allButLastPoi = _.initial(pois);
                // pass the new array (pois array but without first obj) into func to get all but last obj
                var noFirstnoLastPoi = _.initial(allButFirstPoi);

                // if user doesn't enter a starting point then set to first poi, user enters ending point
                if ($("#routeStart").val() == "" && $("#routeEnd").val() !== "") {
                  // set origin to be the first point of interest
                  var start = firstPoiLatLng;
                  // set destination to the value of input for routeEnd
                  var end = $("#routeEnd").val();
                  // init an empty waypoints array
                  var waypoints = [];
                  // iterate through all but first point of interest
                  _.each(allButFirstPoi, function (poi) {
                    // set value of poiLat and poiLng
                    allButFirstPoiLat = poi.lat;
                    allButFirstPoiLng = poi.lng;
                    // create a new google maps latlng object with all but first poi lat and lng
                    allButFirstPoiLatLng = new google.maps.LatLng(allButFirstPoiLat, allButFirstPoiLng);
                    // add all but first poi obj coords into waypoint array
                    waypoints.push({
                      location: allButFirstPoiLatLng,
                      stopover: true
                    });
                  });// end of _.each func
                  // grab the value selected by the user for mode of transport
                  var travelMode = $('input[name="travelMode"]:checked').val();
                  // set up request
                  var request = {
                    origin: start,
                    destination: end,
                    waypoints: waypoints,
                    // optimizeWaypoints: true, // will create the most efficient route
                    unitSystem: google.maps.UnitSystem.IMPERIAL,
                    travelMode: google.maps.DirectionsTravelMode[travelMode]
                  };

                  // if user doesn't enter a ending point then set to last poi, user enters starting point
                } else if ($("#routeEnd").val() == "" && $("#routeStart").val() !== "") {
                  // set origin to the value of input for routeStart
                  var start = $("#routeStart").val();
                  // set destination to be the last point of interest
                  var end = lastPoiLatLng;
                  // init an empty waypoints array
                  var waypoints = [];
                  // iterate through all but last point of interest
                  _.each(allButLastPoi, function (poi) {
                    // set value of poiLat and poiLng
                    allButLastPoiLat = poi.lat;
                    allButLastPoiLng = poi.lng;
                    // create a new google maps latlng object with all but last poi lat and lng
                    allButLastPoiLatLng = new google.maps.LatLng(allButLastPoiLat, allButLastPoiLng);
                    // add all but last poi obj coords into waypoint array
                    waypoints.push({
                      location: allButLastPoiLatLng,
                      stopover: true
                    });
                  });// end of _.each func
                  // grab the value selected by the user for mode of transport
                  var travelMode = $('input[name="travelMode"]:checked').val();
                  // set up request
                  var request = {
                    origin: start,
                    destination: end,
                    waypoints: waypoints,
                    // optimizeWaypoints: true, // will create the most efficient route
                    unitSystem: google.maps.UnitSystem.IMPERIAL,
                    travelMode: google.maps.DirectionsTravelMode[travelMode]
                  };

                  // if user doesn't enter a starting point and an ending point set as first and last pois
                } else if ($("#routeStart").val() == "" && $("#routeEnd").val() == "") {
                  // set origin to be the first point of interest
                  var start = firstPoiLatLng;
                  // set destination to be the last point of interest
                  var end = lastPoiLatLng;
                  // init an empty waypoints array
                  var waypoints = [];
                  // iterate through all but first and last point of interest
                  _.each(noFirstnoLastPoi, function (poi) {
                    // set value of poiLat and poiLng
                    noFirstnoLastPoiLat = poi.lat;
                    noFirstnoLastPoiLng = poi.lng;
                    // create a new google maps latlng object with all but first and last poi lat and lng
                    noFirstnoLastPoiLatLng = new google.maps.LatLng(noFirstnoLastPoiLat, noFirstnoLastPoiLng);
                    // add all but first and last poi obj coords into waypoint array
                    waypoints.push({
                      location: noFirstnoLastPoiLatLng,
                      stopover: true
                    });
                  });// end of _.each func
                  // grab the value selected by the user for mode of transport
                  var travelMode = $('input[name="travelMode"]:checked').val();
                  // set up request
                  var request = {
                    origin: start,
                    destination: end,
                    waypoints: waypoints,
                    // optimizeWaypoints: true, // will create the most efficient route
                    unitSystem: google.maps.UnitSystem.IMPERIAL,
                    travelMode: google.maps.DirectionsTravelMode[travelMode]
                  };

                  // if user enters both a starting point and ending point use these values and include all pois in waypoints
                } else {
                  // set origin to the value of input for routeStart
                  var start = $("#routeStart").val();
                  // set destination to the value of input for routeEnd
                  var end = $("#routeEnd").val();
                  // init an empty waypoints array
                  var waypoints = [];
                  // iterate through all point of interest
                  _.each(pois, function (poi) {
                    // set value of poiLat and poiLng
                    poiLat = poi.lat;
                    poiLng = poi.lng;
                    // create a new google maps latlng object with all poi lat and lng
                    poiLatLng = new google.maps.LatLng(poiLat, poiLng);
                    // add all poi obj coords into waypoint array
                    waypoints.push({
                      location: poiLatLng,
                      stopover: true
                    });
                  });// end of _.each func
                  // grab the value selected by the user for mode of transport
                  var travelMode = $('input[name="travelMode"]:checked').val();
                  // set up request
                  var request = {
                    origin: start,
                    destination: end,
                    waypoints: waypoints,
                    // optimizeWaypoints: true, // will create the most efficient route
                    unitSystem: google.maps.UnitSystem.IMPERIAL,
                    travelMode: google.maps.DirectionsTravelMode[travelMode]
                  };
                }// end of conditional func
                // send the request to google api
                directionsService.route(request, function(response, status) {
                  // check to make sure reuest was successful
                  if (status == google.maps.DirectionsStatus.OK) {
                    // clear the directions panel before adding new directions
                    $('#directionsPanel').empty();
                    // clear the totals panel before adding new totals
                    $('#totals').empty();
                    // generate directions
                    directionsDisplay.setDirections(response);
                    // set initial value for vars
                    var totalDistance = 0;
                    var totalDuration = 0;
                    // set var to payload returned from google api
                    var legs = response.routes[0].legs;
                    // iterate through legs in payload
                    for (var i = 0; i < legs.length; i++) {
                      // add up each distance value
                      totalDistance += legs[i].distance.value;
                      // add up each duration value
                      totalDuration += legs[i].duration.value;
                    }
                    // value to convert meters to miles
                    var meters_to_miles = 0.000621371192;
                    // display output with text miles
                    $('#distance').text((Math.round( totalDistance * meters_to_miles * 10 ) / 10)+' miles');
                    // display output with text minutes
                    $('#duration').text(Math.round( totalDuration / 60 )+' minutes');

                    // set var to number
                    var tAT = 0;
                    // iterate through the pois array
                    _.each(pois, function (pois) {
                      // grab allottedTime for all pois
                      var allAllottedTimes = parseInt(pois.allottedTime, 10);
                      // add allocated times for each poi together and store in tAT
                      tAT = tAT + allAllottedTimes;
                    });

                    // set var to total plan mins
                    var tPT = singlePlan.totalPlanMins;
                    totalDuration = Math.round( totalDuration / 60);
                    var tTA = tPT - (tAT + totalDuration);

                    $('#totalPlanTime').html(tPT + ' Minutes');
                    // display total allocated time total in specific place on timeline html
                    $('#totalAllottedTime').html(tAT + ' Minutes');
                    // display total remaining time total in specific place on timeline html
                    $('#totalTimeAvailable').html(tTA + ' Minutes');

                  } else {
                    // alert an error message when the route could not be calculated.
                    if (status == 'ZERO_RESULTS') {
                      alert('No route could be found between the origin and destination.');
                    } else if (status == 'UNKNOWN_ERROR') {
                      alert('A directions request could not be processed due to a server error. The request may succeed if you try again.');
                    } else if (status == 'REQUEST_DENIED') {
                      alert('This webpage is not allowed to use the directions service.');
                    } else if (status == 'OVER_QUERY_LIMIT') {
                      alert('The webpage has gone over the requests limit in too short a period of time.');
                    } else if (status == 'NOT_FOUND') {
                      alert('At least one of the origin, destination, or waypoints could not be geocoded.');
                    } else if (status == 'INVALID_REQUEST') {
                      alert('The DirectionsRequest provided was invalid.');
                    } else {
                      alert("There was an unknown error in your request. Requeststatus: nn"+status);
                    }
                  }
                });

            });

          }


        var updateComments = function (singlePlan) {
          // update on Parse the specifiic plan's comments
          return $http.put(PARSE_URI + 'classes/Plans/' + singlePlan.objectId, singlePlan, PARSE_HEADERS);
        }

        return {
          updateTimes:    updateTimes,
          updateComments: updateComments
        }

      }// end of factory func


  ]);// end of factory dependencies

}());// end of IIFE
