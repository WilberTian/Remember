var tagServices = angular.module("remember.tagServices", ["ngResource"]);

tagServices.factory("Tag", function($resource){
    return $resource("/remember/api/v1.0/tags/:id", {id: "@id"}, { update: { method: "PUT" }});
});     

tagServices.factory("TagListLoader", function(Tag, $q){
    return function(){
        var delay = $q.defer();
        
        Tag.get(function(tags){
            delay.resolve(tags);
        }, function(){
            delay.reject("Unable to fetch tags");
        });
        
        return delay.promise;
    }
});    

