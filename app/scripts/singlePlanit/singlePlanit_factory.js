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
            alert('please enter something to search for')
          } else {
            return $http.get('https://api.foursquare.com/v2/venues/search?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&near='+dest+'&query='+$('#query').val()+'').success(function (data) {
            console.log(data);
            });
          }
        }

        // function for explore tied to Top Picks button
        var doTopPicks = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=topPicks').success(function (data) {
              console.log(data);
            });
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Trending button
        var doTrending = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=trending').success(function (data) {
              console.log(data);
            });
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Sights button
        var doSights = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=sights').success(function (data) {
              console.log(data);
            });
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Food button
        var doFood = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=food').success(function (data) {
              console.log(data);
            });
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Drinks button
        var doDrinks = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=drinks').success(function (data) {
              console.log(data);
            });
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Shops button
        var doShops = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=shops').success(function (data) {
              console.log(data);
            });
          } else {
            alert('please remove search term and try again');
          }
        }

        // function for explore tied to Arts button
        var doArts = function (singlePlan) {
          var dest = singlePlan.destination;
          if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&near='+dest+'&section=arts').success(function (data) {
              console.log(data);
            });
          } else {
            alert('please remove search term and try again');
          }
        }

        // function to get details for each poi returned from search results
        var poiDetails = function (objId) {
          return $http.get('https://api.foursquare.com/v2/venues/' + objId + '?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806').success(function (data) {
            console.log(data);
          }).error(function(data) {
            console.log('error');
          });
        }
        // function to get details for each poi returned from explore results
        var poiExDetails = function (objId) {
          return $http.get('https://api.foursquare.com/v2/venues/' + objId + '?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806').success(function (data) {
            console.log(data);
          }).error(function(data) {
            console.log('error');
          });
        }

        // add a poi to "plan" list - result is the poi object, singlePlan is the current Plan object
        var addPoi = function (result, singlePlan) {
          console.log(result);
          // push the object into the pois table in the current Plan object
          // if result.veue ) {regular way}
          singlePlan.pois.push({ name: result.name, id: result.id, allottedTime: 0, lat: result.location.lat, lng: result.location.lng });
          // update the array with the new object singlePlan
          $http.put(PARSE_URI + 'classes/Plans/' + singlePlan.objectId, singlePlan, PARSE_HEADERS).success( function (data) {
                console.log(data);
            });

        }

        // delete single poi
        var deletePoi = function (result, index, singlePlan) {
          // splice the object from the array inside of pois inside of singlePlan Object
          singlePlan.pois.splice(index, 1);
          // update the singlePlan object in Parse with new singlePlan object
          return $http.put(PARSE_URI + 'classes/Plans/' + singlePlan.objectId, singlePlan, PARSE_HEADERS);
        }


        return {
          getOnePlan:   getOnePlan,
          doSearch:     doSearch,
          doTopPicks:   doTopPicks,
          doTrending:   doTrending,
          doSights:     doSights,
          doFood:       doFood,
          doDrinks:     doDrinks,
          doShops:      doShops,
          doArts:       doArts,
          poiDetails:   poiDetails,
          poiExDetails: poiExDetails,
          addPoi:       addPoi,
          deletePoi:    deletePoi
        }

      }

    ]);

}());
