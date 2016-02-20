mainApp.controller("sessoesController", ['$scope', '$filter', 'SessaoServices',
    function ($scope, $filter, SessaoServices) {
        SessaoServices.getAllSessaos().then(function (data) {
            $scope.sessoes = data;
        }, function (data) {

        });

    }]);

mainApp.controller("sessoesDetailController", ['$scope', '$routeParams', '$location','SessaoServices', 'ngToast',
    function ($scope, $routeParams, $location, SessaoServices, ngToast) {
        SessaoServices.getSessaoForId($routeParams.id).then(function (data) {
            if (data) {
                $scope.data = data;
            } else {
                $location.path('/sessoes/');
            }
        }, function (err) {
        });
        $scope.gravar = function () {

            if ($scope.criarForm.$valid) {
                SessaoServices.updateSessao($routeParams.id, $scope.data).then(function (data) {
                    ngToast.create('Gravado com sucesso');
                    $location.path('/sessoes/');
                }, function (err) {
                });
            }
        };
    }]);

mainApp.controller("criarSessoesController", ['$scope', '$location','SessaoServices', 'ngToast',
    function ($scope, $location, SessaoServices, ngToast) {

        $scope.gravar = function () {
            if ($scope.criarForm.$valid) {
                SessaoServices.createSessao($scope.data).then(function () {
                    ngToast.create('Gravado com sucesso');
                    $location.path('/sessoes/');
                }, function (err) {
                });
            } else {
                ngToast.create('Erro');
            }
        };

    }]);