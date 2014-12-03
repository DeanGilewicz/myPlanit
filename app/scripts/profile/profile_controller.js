(function () {
  angular.module('myPlanit')
    .controller('ProfileCtrl', ['ProfileFactory', '$scope', '$cookieStore',
      function (ProfileFactory, $scope, $cookieStore) {

        ProfileFactory.plansByUser().success( function (data) {
          console.log(data);
          $scope.userPlans = data.results;
        });

        $scope.currentUsername = $cookieStore.get('currentUser').username;
        console.log($scope.currentUsername);



      }

    ]);

}());
