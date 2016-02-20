mainApp.service('ParticipanteServices', ['$http', '$q', function ($http, $q) {

    this.getAllParticipantes = function () {
        return $http.get('/participantes/').
            then(function(response){
               return response.data;
            });
    };

    this.getParticipanteForId = function (id) {
        return $http.get('/participantes/' + id).
            then(function(response){
                return response.data;
            },function(response){
               $q.reject(response.data);
            });
    };

    this.createParticipante = function (data) {
        return $http.post('/participantes/create', data, {}).
            then(function(response){
              return response.data;
            });
    };

    this.updateParticipante = function (id, data) {
        return $http.put('/participantes/' + id, data, {}).
            then(function(response){
               return response.data;
            });
    };

    this.deleteParticipante = function (id) {
        return $http.delete('/participantes/' + id, {}).
            then(function(response){
               return id;
            });
    };

}]);