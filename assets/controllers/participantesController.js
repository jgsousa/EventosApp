mainApp.controller("participantesController", ['$scope', '$filter', 'ParticipanteServices',
    function ($scope, $filter, ParticipanteServices) {
        ParticipanteServices.getAllParticipantes().then(function (data) {
            $scope.participantes = data;
        }, function (data) {

        });

    }]);

mainApp.controller("participantesDetailController", ['$scope', '$routeParams', '$location','ParticipanteServices','ngToast',
    function ($scope, $routeParams, $location, ParticipanteServices, ngToast) {
        ParticipanteServices.getParticipanteForId($routeParams.id).then(function (data) {
            if (data) {
                $scope.data = data;
            } else {
                $location.path('/participantes/');
            }
        }, function (err) {
        });
        $scope.gravar = function () {

            if ($scope.criarForm.$valid) {
                ParticipanteServices.updateParticipante($routeParams.id, $scope.data).then(function (data) {
                    ngToast.create('Gravado com sucesso');
                    $location.path('/participantes/');
                }, function (err) {
                });
            }
        };
    }]);

mainApp.controller("criarParticipantesController", ['$scope', '$location','ParticipanteServices', 'ngToast',
    function ($scope, $location, ParticipanteServices, ngToast) {

        $scope.gravar = function () {
            if ($scope.criarForm.$valid) {
                ParticipanteServices.createParticipante($scope.data).then(function () {
                    ngToast.create('Gravado com sucesso');
                    $location.path('/participantes/');
                }, function (err) {
                });
            } else {
                ngToast.create('Erro');
            }
        };

    }]);