mainApp.controller("eventosController", ['$scope', '$filter', 'EventoServices', 'ngToast',
    function ($scope, $filter, EventoServices, ngToast) {

        EventoServices.getAllEventos().then(function (data) {
            $scope.eventos = data;
        }, function (data) {

        });

    }]);

mainApp.controller("eventosDetailController", ['$scope', '$routeParams', '$location', 'EventoServices', 'ngToast',
    function ($scope, $routeParams, $location, EventoServices, ngToast) {
        EventoServices.getEventoForId($routeParams.id).then(function (data) {
            if (data) {
                $scope.data = data;
            } else {
                $location.path('/eventos/');
            }
        }, function (err) {
        });
        $scope.gravar = function () {

            if ($scope.criarForm.$valid) {
                EventoServices.updateEvento($routeParams.id, $scope.data).then(function (data) {
                    ngToast.create('Gravado com sucesso');
                    $location.path('/eventos/');
                }, function (err) {
                });
            }
        };
    }]);

mainApp.controller("criarEventosController", ['$scope', '$location', 'EventoServices', 'ngToast',
    function ($scope, $location, EventoServices, ngToast) {

        $scope.gravar = function () {
            if ($scope.criarForm.$valid) {
                EventoServices.createEvento($scope.data).then(function () {
                    ngToast.create('Gravado com sucesso');
                    $location.path('/eventos/');
                }, function (err) {
                });
            } else {
                ngToast.create('Erro');
            }
        };

    }]);