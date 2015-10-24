angular.module('app')
  .controller('VideoController', ['$scope', 'GlobalService', 'VideoService', 'rfc4122',
    function($scope, GlobalService, VideoService, rfc4122) {
      $scope.msg = GlobalService.getMessageObject();
      $scope.dataList = {
        data: {
          offense: {
            passing: {
              users: [{
                id: "abc",
                isCompletion: true,
                isTouchDown: false,
                isInterception: false,
                isSack: false,
                yardsPassing: 7
              }]
            },
            rushing: {
              users: [{
                id: "def",
                isTouchDown: false,
                isFumble: false,
                yardsRushing: 7
              }]
            },
            receiving: {
              users: [{
                id: "ghi",
                isReception: true,
                isTouchDown: false,
                isFumble: false,
                yardsReceiving: 7,
                yardsAfterCatch: 3
              }]
            }
          },
          defense: {},
          specialTeams: {}
        }
      };
      $scope.currentTime = "";
      $scope.videoList = [{
        poster: "/api/getPoster/1?now=",
        type0: "video/mp4",
        src0: "/api/getVideo/mp4/1?now=",
        type1: "video/webm",
        src1: "/api/getVideo/webm/1?now=",
        markers: [{
          time: 4.2,
          text: "this"
        }, {
          time: 9.5,
          text: "really"
        }, {
          time: 16,
          text: "is"
        }, {
          time: 23.6,
          text: "so"
        }, {
          time: 28,
          text: "cool"
        }, {
          time: 36,
          text: ":)"
        }, {
          time: 56,
          text: "..more"
        }, {
          time: 91,
          text: "..more2"
        }]
      }, {
        poster: "/api/getPoster/2?now=",
        type0: "video/mp4",
        src0: "/api/getVideo/mp4/2?now=",
        type1: "video/webm",
        src1: "/api/getVideo/webm/2?now=",
        markers: [{
          time: 6.4,
          text: "this"
        }, {
          time: 11.5,
          text: "really"
        }, {
          time: 19,
          text: "is"
        }, {
          time: 30.6,
          text: "so"
        }, {
          time: 32,
          text: "cool"
        }, {
          time: 45,
          text: ":)"
        }, {
          time: 59,
          text: "..more"
        }, {
          time: 81,
          text: "..more2"
        }, {
          time: 87,
          text: "..more3"
        }]
      }];

      $scope.setMsg = function(msg, type) {
        $scope.msg = GlobalService
          .getMessageObject(msg, type);
      };

      //
      // $scope broadcasters
      //
      $scope.playerNewTime = function(p1) {
        $scope.$broadcast("playerNewTime", p1);
      };

      $scope.getMarkers = function(p1) {
        $scope.$broadcast("getMarkers", p1);
      };

      $scope.markerNext = function(p1) {
        $scope.$broadcast("markerNext", p1);
      };

      $scope.markerPrev = function(p1) {
        $scope.$broadcast("markerPrev", p1);
      };

      $scope.markerRemove = function(p1) {
        $scope.$broadcast("markerRemove", p1);
      };

      $scope.markerRemoveAll = function(p1) {
        $scope.$broadcast("markerRemoveAll", p1);
      };

      // TODO reference http://beta.sportsdaydfw.com/high-school/football/game/2015/21820
      $scope.markerAdd = function(p1) {
        if (!p1) {
          p1 = [{
            time: $scope.currentTime,
            text: "new marker@" + $scope.currentTime,
            markerId: rfc4122.v4()
          }];
        }
        $scope.$broadcast("markerAdd", p1);
      };

      $scope.markerUpdateTime = function(p1) {
        $scope.$broadcast("markerUpdateTime", p1);
      };

      $scope.markerReset = function(p1) {
        $scope.$broadcast("markerReset", p1);
      };

      $scope.markerDestroy = function(p1) {
        $scope.$broadcast("markerDestroy", p1);
      };


      $scope.getVideoData = function(pCriteria) {
        VideoService.getVideoData(pCriteria)
          .then(function(data) {
            $scope.dataList = data;
            $scope.msg = GlobalService
              .getMessageObject($scope.dataList, "info");
            return data;
          }, function(error) {
            $scope.msg = GlobalService
              .getMessageObject(error.data.text, error.data.type);
          });
      };

      $scope.set1 = function () {
          $scope.videoList[0] = [
              {
                  poster: "/api/getPoster/1?now=",
                  type0: "video/mp4",
                  src0: "/api/getVideo/mp4/1?now=",
                  type1: "video/webm",
                  src1: "/api/getVideo/webm/1?now="
              }
          ];
          $scope.setNewTime(0);
      };

      $scope.set2 = function () {
          $scope
              .videoList[0] = [
              {
                  poster: "/api/getPoster/2?now=",
                  type0: "video/mp4",
                  src0: "/api/getVideo/mp4/2?now=",
                  type1: "video/webm",
                  src1: "/api/getVideo/webm/2?now="
              }
          ];
          $scope.setNewTime(0);
      };

      // remove
      /*$scope.remove = function (id) {
       VideoService.remove(id)
       .then(function (data) {
       $scope.msg = GlobalService
       .getMessageObject("Success", "success");
       // re-initialize grid
       $scope.init();
       }, function (error) {
       $scope.msg = GlobalService
       .getMessageObject(error.data.text, error.data.type);
       });
       };*/

      // init
      angular.element(document).ready(function() {
        //$scope.getVideoData("");
      });

    }
  ]);

/*
 angular.module('app')
 .controller('VideoController',
 function ($scope, GlobalService, VideoService) {
 $scope.msg = GlobalService.getMessageObject();

 // remove
 $scope.remove = function (id) {
 VideoService.remove(id)
 .then(function (data) {
 $scope.msg = GlobalService
 .getMessageObject("Success", "success");
 // re-initialize grid
 $scope.init();
 }, function (error) {
 $scope.msg = GlobalService
 .getMessageObject(error.data.text, error.data.type);
 });
 };

 // init
 $scope.init = function () {
 // find
 VideoService.find()
 .then(function (data) {
 $scope.dataList = data;
 }, function (error) {
 $scope.msg = GlobalService
 .getMessageObject(error.data.text, error.data.type);
 });
 };

 // call init
 angular.element(document).ready(function () {
 $scope.init();
 });
 });

 */
