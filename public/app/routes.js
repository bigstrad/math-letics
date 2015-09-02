angular.module('app')
    .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'app/components/home/homeView.html'
        })

        // video page
        .when('/video', {
            templateUrl: 'app/components/video/videoView.html',
            controller: 'VideoController'
        })


//        // otherwise
//        .otherwise({
//			redirectTo: '/'
//            redirectTo: '/view/404'
//        });

    $locationProvider.html5Mode(true);

}]);
