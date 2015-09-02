angular.module('app')
    .factory('VideoService', ['$http', '$q', function ($http, $q) {
    var service = {};

    // get now
    service.getNow = function () {
        return moment().toISOString();
    };

    // get video data
    service.getVideoData = function (pCriteria) {
        var deferred = $q.defer()
        var data = [];
        var json = [
            {
                "id": "1",
                "sources": [
                    {
                        "type": "video/mp4"
                    },
                    {
                        "type": "video/webm"
                    },
                    {
                        "type": "video/ogg"
                    }
                ]
            },
            {
                "id": "2",
                "sources": [
                    {
                        "type": "video/mp4"
                    },
                    {
                        "type": "video/webm"
                    },
                    {
                        "type": "video/ogg"
                    }
                ]
            }
        ];
        var data = [
            {
                poster: "/api/getPoster/1?now=",
                type0: "video/mp4",
                src0: "/api/getVideo/mp4/1?now=",
                type1: "video/webm",
                src1: "/api/getVideo/webm/1?now=",
                markers: [
                    {
                        time: 4.2,
                        text: "this"
                    },
                    {
                        time: 9.5,
                        text: "really"
                    },
                    {
                        time: 16,
                        text: "is"
                    },
                    {
                        time: 23.6,
                        text: "so"
                    },
                    {
                        time: 28,
                        text: "cool"
                    },
                    {
                        time: 36,
                        text: ":)"
                    },
                    {
                        time: 56,
                        text: "..more"
                    },
                    {
                        time: 91,
                        text: "..more2"
                    }
                ]
            },
            {
                poster: "/api/getPoster/2?now=",
                type0: "video/mp4",
                src0: "/api/getVideo/mp4/2?now=",
                type1: "video/webm",
                src1: "/api/getVideo/webm/2?now=",
                markers: [
                    {
                        time: 6.4,
                        text: "this"
                    },
                    {
                        time: 11.5,
                        text: "really"
                    },
                    {
                        time: 19,
                        text: "is"
                    },
                    {
                        time: 30.6,
                        text: "so"
                    },
                    {
                        time: 32,
                        text: "cool"
                    },
                    {
                        time: 45,
                        text: ":)"
                    },
                    {
                        time: 59,
                        text: "..more"
                    },
                    {
                        time: 81,
                        text: "..more2"
                    },
                    {
                        time: 87,
                        text: "..more3"
                    }
                ]
            }
        ];
        /*
         // get poster
         player.poster("/api/getPoster/1?now=" + now);
         player.src([
         { type: "video/mp4", src: "/api/getVideo/mp4/1?now=" + now },
         { type: "video/webm", src: "/api/getVideo/webm/1?now=" + now }
         //{ type: "video/ogg", src: "/api/getVideo/ogv/1?now=" + now }
         ]);
         */
        deferred.resolve(data);
        return deferred.promise
        /*return $http
            .post('/api/getVideoData', pCriteria)
            .then(function (response) {
                return response.data;
            });*/
    };

    // find
    service.find = function () {
        return $http
            .get('/api/findVideo')
            .then(function (response) {
                return response.data;
            });
    };

    // remove
    service.remove = function (id) {
        return $http
            .get('/api/removeVideo/' + id)
            .then(function (response) {
                return response.data;
            });
    };

    // save
    service.save = function (obj) {
        return $http
            .post('/api/saveVideo', obj)
            .then(function (response) {
                return response.data;
            }, function (error) {
                return $q.reject(error);
            });
    };

    return service;

    /*return {
     // find
     get : function() {
     return $http.get('/api/findCat');
     },

     // create
     create : function(obj) {
     return $http.post('/api/saveCat', obj);
     },

     // remove
     delete : function(id) {
     return $http.delete('/api/removeCat/' + id);
     }
     }*/

}]);