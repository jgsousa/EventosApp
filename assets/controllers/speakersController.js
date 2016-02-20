mainApp.controller("speakersController", ['$scope', '$filter', 'SpeakerServices',
    function ($scope, $filter, SpeakerServices) {
        SpeakerServices.getAllSpeakers().then(function (data) {
            $scope.speakers = data;
        }, function (data) {

        });

    }]);

mainApp.controller("speakersDetailController", ['$scope', '$routeParams', '$location','SpeakerServices','ngToast',
    function ($scope, $routeParams, $location, SpeakerServices, ngToast) {
        SpeakerServices.getSpeakerForId($routeParams.id).then(function (data) {
            if (data) {
                $scope.data = data;
            } else {
                $location.path('/speakers/');
            }
        }, function (err) {
        });
        $scope.gravar = function () {

            if ($scope.criarForm.$valid) {
                SpeakerServices.updateSpeaker($routeParams.id, $scope.data).then(function (data) {
                    ngToast.create('Gravado com sucesso');
                    $location.path('/speakers/');
                }, function (err) {
                });
            }
        };
    }]);

mainApp.controller("criarSpeakersController", ['$scope', '$location','SpeakerServices','ngToast',
    function ($scope, $location, SpeakerServices, ngToast) {

        $scope.gravar = function () {
            if ($scope.criarForm.$valid) {
                SpeakerServices.createSpeaker($scope.data).then(function () {
                    ngToast.create('Gravado com sucesso');
                    $location.path('/speakers/');
                }, function (err) {
                });
            } else {

            }
        };

    }]);