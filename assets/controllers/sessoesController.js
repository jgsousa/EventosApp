mainApp.controller("sessoesController", ['$scope', '$filter', 'SessaoServices',
    function ($scope, $filter, SessaoServices) {
        SessaoServices.getAllSessaos().then(function (data) {
            $scope.sessoes = data;
        }, function (data) {

        });

    }]);

mainApp.controller("sessoesDetailController", ['$scope', '$routeParams', '$location','SessaoServices', 'ngToast',
    'EventoServices', 'SpeakerServices',
    function ($scope, $routeParams, $location, SessaoServices, ngToast, EventoServices, SpeakerServices) {
        EventoServices.getAllEventos().then(function (data) {
            $scope.eventos = data;
            if ($scope.data.eventoId){
                for (var i = 0; i < data.length; i++ ){
                    if (data[i]._id == $scope.data.eventoId){
                        $scope.data.evento = data[i].nome;
                    }
                }
            }
        });

        SpeakerServices.getAllSpeakers().then(function (data) {
            $scope.oradores = data;
        });

        SessaoServices.getSessaoForId($routeParams.id).then(function (data) {
            if (data) {
                $scope.data = data;
                $scope.data.dataInicio = new Date($scope.data.dataInicio);
                $scope.data.dataFim = new Date($scope.data.dataFim);
                $scope.data.orador = data.speaker.nome;
                if ($scope.eventos){
                    for (var i = 0; i < $scope.eventos.length; i++ ){
                        if ($scope.eventos[i]._id == $scope.data.eventoId){
                            $scope.data.evento = $scope.eventos[i].nome;
                        }
                    }
                }
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

        $scope.dropSelected = function (evento) {
            $scope.data.eventoId = evento._id;
            $scope.data.evento = evento.nome;
        };

        $scope.dropSelectedSpeaker = function (orador) {
            $scope.data.speaker = orador;
            $scope.data.orador = orador.nome;
        };
    }]);

mainApp.controller("criarSessoesController", ['$scope', '$location','SessaoServices', 'ngToast',
    'EventoServices', 'SpeakerServices',
    function ($scope, $location, SessaoServices, ngToast, EventoServices, SpeakerServices) {
        $scope.data = {};
        EventoServices.getAllEventos().then(function (data) {
            $scope.eventos = data;
        });

        SpeakerServices.getAllSpeakers().then(function (data) {
            $scope.oradores = data;
        });

        $scope.dropSelected = function (evento) {
            $scope.data.eventoId = evento._id;
            $scope.data.evento = evento.nome;
        };

        $scope.dropSelectedSpeaker = function (orador) {
            $scope.data.speaker = orador;
            $scope.data.orador = orador.nome;
        };

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