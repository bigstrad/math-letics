angular.module('app')
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

      $routeProvider

      // home page
      .when('/', {
        templateUrl: 'app/components/home/homeView.html'
      })

      // main video page
      .when('/video', {
        templateUrl: 'app/components/video/videoEditView.html',
        controller: 'VideoController'
      })

      // main edit page
      .when('/videoEdit', {
        templateUrl: 'app/components/video/videoEditView.html',
        controller: 'VideoController'
      })

      // main upload page
      .when('/videoUpload', {
        templateUrl: 'app/components/video/videoUploadView.html',
        controller: 'VideoController'
      })


      //        // otherwise
      //        .otherwise({
      //			redirectTo: '/'
      //            redirectTo: '/view/404'
      //        });

      $locationProvider.html5Mode(true);

    }
  ]);
