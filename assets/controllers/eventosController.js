var BinaryFileReader = {
    read: function(file, callback){
        var reader = new FileReader;

        var fileInfo = {
            name: file.name,
            type: file.type,
            size: file.size,
            file: null
        };

        reader.onload = function(){
            fileInfo.file = new Uint8Array(reader.result);
            callback(null, fileInfo);
        };
        reader.onerror = function(){
            callback(reader.error);
        };

        reader.readAsArrayBuffer(file);
    }
};

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
                $scope.data.dataInicio = new Date($scope.data.dataInicio);
                $scope.data.dataFim = new Date($scope.data.dataFim);
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
        $scope.uploadFile = function(event){
            var file = event.target.files[0];
            BinaryFileReader.read(file, function(err, fileInfo){
                var ficheiro = {};
                ficheiro.eventoId = $routeParams.id;
                ficheiro.file = fileInfo;
                EventoServices.uploadFile($routeParams.id, ficheiro);
            });
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

