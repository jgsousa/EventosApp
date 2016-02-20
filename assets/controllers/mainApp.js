var mainApp = angular.module('mainApp', ['ngRoute', 'ngToast', 'ui.bootstrap', 'nvd3', 'ui.grid', 'ui.grid.edit',
    'ui.grid.grouping', 'ui.grid.exporter','ui.grid.pinning','angularSpinner']);

mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

        // route for the home page

        .when('/main', {
            templateUrl: 'pages/main/main.html',
            controller: 'mainController'
        })

        .when('/users', {
            templateUrl: 'pages/user/users.html',
            controller: 'usersController'
        })

        .when('/users/:id', {
            templateUrl: 'pages/user/usersdetail.html',
            controller: 'usersDetailController'
        })

        .when('/criaruser', {
            templateUrl: 'pages/user/criaruser.html',
            controller: 'criarUserController'
        })
        .when('/eventos', {
            templateUrl: 'pages/eventos/eventos.html',
            controller: 'eventosController'
        })

        .when('/eventos/:id', {
            templateUrl: 'pages/eventos/eventosdetail.html',
            controller: 'eventosDetailController'
        })

        .when('/criarevento', {
            templateUrl: 'pages/eventos/eventosdetail.html',
            controller: 'criarEventosController'
        })
        .when('/sessoes', {
            templateUrl: 'pages/sessoes/sessoes.html',
            controller: 'sessoesController'
        })

        .when('/sessoes/:id', {
            templateUrl: 'pages/sessoes/sessoesdetail.html',
            controller: 'sessoesDetailController'
        })

        .when('/criarsessao', {
            templateUrl: 'pages/sessoes/sessoesdetail.html',
            controller: 'criarSessoesController'
        })
        .when('/speakers', {
            templateUrl: 'pages/speakers/speakers.html',
            controller: 'speakersController'
        })

        .when('/speakers/:id', {
            templateUrl: 'pages/speakers/speakersdetail.html',
            controller: 'speakersDetailController'
        })

        .when('/criarspeaker', {
            templateUrl: 'pages/speakers/speakersdetail.html',
            controller: 'criarSpeakersController'
        })
        .when('/participantes', {
            templateUrl: 'pages/participantes/participantes.html',
            controller: 'participantesController'
        })

        .when('/participantes/:id', {
            templateUrl: 'pages/participantes/participantesdetail.html',
            controller: 'participantesDetailController'
        })

        .when('/criarparticipante', {
            templateUrl: 'pages/participantes/participantesdetail.html',
            controller: 'criarParticipantesController'
        })
        .when('/login', {
            templateUrl: 'pages/users/login.html'
        })
        //===== yeoman mainapp hook =====//
        .otherwise({ redirectTo: '/main'});

}]);

mainApp.config(['ngToastProvider',function(ngToast) {
    ngToast.configure({
        verticalPosition: 'top',
        horizontalPosition: 'right',
        maxNumber: 3,
        timeout: 2000,
        dismissOnTimeout: true
    });
}]);

mainApp.controller("navController", ['$scope', function ($scope) {
    $scope.funcao1 = "Utilizadores";
    $scope.funcao2 = "Backlog";
    $scope.funcao3 = "Recursos";
    $scope.funcao4 = "Projectos";
    $scope.funcao5 = "Budget";
}]);

