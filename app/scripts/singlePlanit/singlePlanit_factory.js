(function () {
  angular.module('myPlanit')
    .factory('SinglePlanitFactory', ['PARSE_URI', 'PARSE_HEADERS', '$http',
      function (PARSE_URI, PARSE_HEADERS, $http) {

        // retrieves a single appt from the server based on id
        var getOnePlan = function (id) {
          return $http.get(PARSE_URI + 'classes/Plans/' + id, PARSE_HEADERS);
        }


        // could add function and call it for specific http requests that need coords
        // var myGeo = function () {
        //   navigator.geolocation.getCurrentPosition(getLocation);
        // }
        // time delay needed since takes a few seconds to get accurate coords needed for http request
        // var delay=1000;//1 seconds
        // setTimeout(function(){
        //   // code to be executed after 1 seconds
        // },delay);

        // get current coords for location
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

        // function for search tied to search button
        var doSearch = function () {
          if($('#query').val() == "" && $('#near').val() == "") {
            alert('Please enter a destination or search term or click "Explore"')
          } else if($('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/search?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&near='+$('#near').val()+'').success(function (data) {
              console.log(data);
            })
          } else if($('#near').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/search?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&ll='+lat+','+lng+'&query='+$('#query').val()+'').success(function (data) {
              console.log(data);
            })
          } else {
            return $http.get('https://api.foursquare.com/v2/venues/search?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&near='+$('#near').val()+'&query='+$('#query').val()+'').success(function (data) {
              console.log(data);
            }).error(function(data) {
              console.log('error');
            });
          }
        }

        // function for explore tied to explore button
        var doExplore = function () {
          if($('#near').val() == "" && $('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10&time=any&day=any&ll='+lat+','+lng+'&section=topPicks').success(function (data) {
              console.log(data);
            })
          } else if($('#near').val() !== "" && $('#query').val() == "") {
            return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=EWYWBGQ5MJ0J2HMJGPYAKMUFZGMCO1DNOFQ4AETJEC4EWPJY&client_secret=5VAOVVTHM0TAXBPOWDESBODD2HLHH4JULBWWA0ZPGA1WN3YG&v=20140806&limit=10time=any&day=any&near='+$('#near').val()+'&section=topPicks').success(function (data) {
              console.log(data);
            })
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

        // TO DO
        // get all points of interests from poiList on Parse
        var getPois = function () {
          return $http.get(PARSE_URI + 'classes/Plans', PARSE_HEADERS);
        }

        // add a poi to "plan" list
        var addPoi = function (result, single) {

          single.pois.push({ name: result.name, id: result.id })

          $http.put(PARSE_URI + 'classes/Plans/' + single.objectId, single, PARSE_HEADERS).success( function (data) {
                console.log(data);
            });

        }

        var deletePoi = function (objId) {
          return $http.delete(PARSE_URI + 'classes/PoiList/' + objId, PARSE_HEADERS);
        }

        return {
          getOnePlan:   getOnePlan,
          doSearch:     doSearch,
          doExplore:    doExplore,
          poiDetails:   poiDetails,
          poiExDetails: poiExDetails,
          getPois:      getPois,
          addPoi:       addPoi,
          deletePoi:    deletePoi
        }

      }

    ]);

}());
