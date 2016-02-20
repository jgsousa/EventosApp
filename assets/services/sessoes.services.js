mainApp.service('SessaoServices', ['$http', '$q', function ($http, $q) {

    this.getAllSessaos = function () {
        return $http.get('/sessoes/').
            then(function(response){
               return response.data;
            });
    };

    this.getSessaoForId = function (id) {
        return $http.get('/sessoes/' + id).
            then(function(response){
                return response.data;
            },function(response){
               $q.reject(response.data);
            });
    };

    this.createSessao = function (data) {
        return $http.post('/sessoes/create', data, {}).
            then(function(response){
              return response.data;
            });
    };

    this.updateSessao = function (id, data) {
        return $http.put('/sessoes/' + id, data, {}).
            then(function(response){
               return response.data;
            });
    };

    this.deleteSessao = function (id) {
        return $http.delete('/sessoes/' + id, {}).
            then(function(response){
               return id;
            });
    };

}]);