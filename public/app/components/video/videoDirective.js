angular.module('app')
// videojs directive - https://amitgharat.wordpress.com/2012/11/25/using-jplayer-in-your-angular-application/
.directive('mathVideoJs', [function () {
    return {
        restrict : 'A',
        link: function (scope, element, attr) {
            var now = moment().toISOString();
            var id = attr.id;
            var player = videojs(id, {}, function(){
                //scope.set1();
                this.poster(scope.videoList[0].poster + now);
                this.src([
                    { type: scope.videoList[0].type0, src: scope.videoList[0].src0 + now },
                    { type: scope.videoList[0].type1, src: scope.videoList[0].src1 + now }
                ]);
            });

            // video markers
            player.markers({
                markerTip:{
                    display: true,
                    text: function(marker) {
                        return marker.text;
                    }
                },
                breakOverlay:{
                    display: true,
                    displayTime: 3,
                    text: function(marker) {
                        return marker.text;
                    }
                },
                onMarkerReached: function(marker) {
                    if (marker) {
                        $('.event-list').children().replaceWith("<a href='#' class='list-group-item activeX'><h4 class='list-group-item-heading'>"
                            + marker.text
                            + "</h4><p class='list-group-item-text'>data can be added here data can be added here data can be added here data can be added here data can be added here data can be added here </p></a>");
                    }
                },
                onMarkerClick: function(marker){
                    if(marker) {
                        scope.getMarkers();
                        $('.event-list').children().replaceWith("<a href='#' class='list-group-item activeX'><h4 class='list-group-item-heading'>"
                            + marker.text
                            + "</h4><p class='list-group-item-text'>data can be added here data can be added here data can be added here data can be added here data can be added here data can be added here </p></a>");
                    }
                },
                markers: [
                    {
                        time: 6.4,
                        text: "this",
                        markerId: "d361d968-9c42-4da8-b6fd-6f589000da77"
                    },
                    {
                        time: 11.5,
                        text: "really",
                        markerId: "8f11ad66-8992-4b99-84ea-9a95b55193d1"
                    }
                ]
            });

            // events https://github.com/videojs/video.js/blob/master/docs/api/vjs.Player.md#timeupdate-event

            //
            // event handlers
            //
            player.on('timeupdate', function() {
                scope.$apply(function () {
                    scope.currentTime = player.currentTime();
                });
            });

            player.on('userinactive', function() {
                player.userActive(true); // keep control bar visible
            });

            //
            // player broadcast listeners
            //
            scope.$on("playerNewTime", function (event, p1) {
                player.currentTime(p1);
            });

            scope.$on("markerRemove", function (event, p1) {
                player.markers.remove([0]);
                //player.markers.remove(p1);
            });

            scope.$on("markerRemoveAll", function (event, p1) {
                player.markers.removeAll();
            });

            //
            // player marker broadcast listeners
            //
            scope.$on("getMarkers", function (event, p1) {
                console.log("player.markers.getMarkers()", player.markers.getMarkers());
            });

            scope.$on("markerNext", function (event, p1) {
                player.markers.next();
            });

            scope.$on("markerPrev", function (event, p1) {
                player.markers.prev();
            });

            scope.$on("markerRemove", function (event, p1) {
                // player.markers.remove([1,2]);
                player.markers.remove(p1);
            });

            scope.$on("markerAdd", function (event, p1) {
                player.markers.add(p1);
            });

            scope.$on("markerUpdateTime", function (event, p1) {
                var markers = player.markers.getMarkers();
                for (var i = 0; i < markers.length; i++) {
                    markers[i].time += 1;
                }
                player.markers.updateTime();
            });

            scope.$on("markerReset", function (event, p1) {
                player.markers.reset([]);
                /*player.markers.reset([{
                    time: 40,
                    text: "I'm NEW"
                },
                {
                    time:20,
                    text: "Brand new"
                }]);*/
            });

            scope.$on("markerDestroy", function (event, p1) {
                //player.markers.destroy();
            });

            //
            // scope watchers
            //

            // watches scope changes on queueCurrentTime and updates player
            /*scope.$watch('queueCurrentTime', function(pCurrentTime) {
                if(scope.queueCurrentTime) {
                    console.log("manually setting currentTime");
                    player.currentTime(scope.queueCurrentTime);
                }
            });*/

            // watches scope changes on videoData and updates player
            /*scope.$watch('videoList', function() {
                player.poster(scope.videoList[0].poster + now);
                player.src([
                    { type: scope.videoList[0].type0, src: scope.videoList[0].src0 + now },
                    { type: scope.videoList[0].type1, src: scope.videoList[0].src1 + now }
                ]);
            });*/

            //
            // key events
            //
            // http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
            window.onkeyup = function(e) {
                var key = e.keyCode ? e.keyCode : e.which;
                if (key == 37) {
                    // left arrow
                    //console.log("left arrow");
                    player.markers.prev();
                }else if (key == 39) {
                    // right arrow
                    //console.log("right arrow");
                    player.markers.next();
                }else if (key == 32) {
                    // space bar
                    var isPaused = player.paused();
                    if(isPaused) {
                        player.play();
                    } else {
                        player.pause();
                    }aa
                }
            }

        }
    }
}])