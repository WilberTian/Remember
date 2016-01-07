var noteServices = angular.module("remember.noteServices", ["ngResource"]);

noteServices.factory("noteDataService", function($resource){
    return $resource("/remember/api/v1.0/notes/:id", {id: "@id"}, { update: { method: "PUT" }});
});     

noteServices.factory("noteListLoader", function(noteDataService, $q){
    return function(){
        var delay = $q.defer();
        
        noteDataService.get(function(notes){
            delay.resolve(notes);
        }, function(){
            delay.reject("Unable to fetch notes");
        });
        
        return delay.promise;
    }
});    

