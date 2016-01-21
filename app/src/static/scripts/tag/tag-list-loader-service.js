angular
	.module("remember.tag")
	.factory("tagListLoader", tagListLoader);

tagListLoader.$inject = ["tagDataService", "$q"];

function tagListLoader(tagDataService, $q){
    return function(){
        var delay = $q.defer();
        
        tagDataService.get(function(tags){
            delay.resolve(tags);
        }, function(){
            delay.reject("Unable to fetch tags");
        });
        
        return delay.promise;
    }
}
