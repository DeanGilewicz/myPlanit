(function () {
  angular.module('myPlanit')
    .controller('NewPlanitCtrl', ['NewPlanitFactory',
      function (NewPlanitFactory) {


        NewPlanitFactory.getPois();

        NewPlanitFactory.genMap();

      }

    ]);

}());
