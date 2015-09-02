angular.module('app')
    .factory('GlobalService', ['$http',
        function ($http) {
        var service = {};

        // message type
        service.messageType = [
            {"type": "", "value": ""},
            {"type": "success", "value": "alert alert-success"},
            {"type": "info", "value": "alert alert-info"},
            {"type": "warning", "value": "alert alert-warning"},
            {"type": "danger", "value": "alert alert-danger"},
            {"type": "error", "value": "alert alert-danger"}
        ];

        // get message
        service.getMessageObject = function (msgText, msgType) {
            if (!msgText) {
                msgText = ""
            }
            ;
            if (!msgType) {
                msgType = ""
            }
            ;
            var css = "success"; // default
            for (var i = 0; i < service.messageType.length; i += 1) {
                if (service.messageType[i].type.toLocaleLowerCase() === msgType.toLowerCase()) {
                    css = service.messageType[i].value;
                }
            }
            return {text: msgText, type: msgType, css: css};
        };

        // send email
        service.sendEmail = function (subject, message) {
            var data = {subject: subject, message: message};
            return $http
                .post('/api/sendEmail', data)
                .then(function (response) {
                    return response.data;
                });
        };

        return service;

    }]);