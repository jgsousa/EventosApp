mainApp.service('SpeakerServices', ['$http', '$q', function ($http, $q) {

    this.getAllSpeakers = function () {
        return $http.get('/speakers/').
            then(function(response){
               return response.data;
            });
    };

    this.getSpeakerForId = function (id) {
        return $http.get('/speakers/' + id).
            then(function(response){
                return response.data;
            },function(response){
               $q.reject(response.data);
            });
    };

    this.createSpeaker = function (data) {
        return $http.post('/speakers/create', data, {}).
            then(function(response){
              return response.data;
            });
    };

    this.updateSpeaker = function (id, data) {
        return $http.put('/speakers/' + id, data, {}).
            then(function(response){
               return response.data;
            });
    };

    this.deleteSpeaker = function (id) {
        return $http.delete('/speakers/' + id, {}).
            then(function(response){
               return id;
            });
    };

}]);