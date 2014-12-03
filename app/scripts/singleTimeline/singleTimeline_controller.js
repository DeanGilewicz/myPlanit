(function () {
  angular.module('myPlanit')
    .controller('SingleTimelineCtrl', ['SingleTimelineFactory',
      function (SingleTimelineFactory) {

        SingleTimelineFactory.getPois();
        SingleTimelineFactory.genMap();

      }

    ]);

}());
