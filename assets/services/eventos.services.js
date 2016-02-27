mainApp.service('EventoServices', ['$http', '$q', function ($http, $q) {

    this.getAllEventos = function () {
        return $http.get('/eventos/').
            then(function(response){
               return response.data;
            });
    };

    this.getEventoForId = function (id) {
        return $http.get('/eventos/' + id).
            then(function(response){
                return response.data;
            },function(response){
               $q.reject(response.data);
            });
    };

    this.createEvento = function (data) {
        return $http.post('/eventos/create', data, {}).
            then(function(response){
              return response.data;
            });
    };

    this.updateEvento = function (id, data) {
        return $http.put('/eventos/' + id, data, {}).
            then(function(response){
               return response.data;
            });
    };

    this.deleteEvento = function (id) {
        return $http.delete('/eventos/' + id, {}).
            then(function(response){
               return id;
            });
    };

    this.uploadFile = function(id,fileInfo){
        return $http.post('/eventos/' + id + '/doc', fileInfo).
        then(function(response){
            return id;
        });
    };

}]);