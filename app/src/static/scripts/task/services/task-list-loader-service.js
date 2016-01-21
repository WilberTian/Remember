angular
	.module("remember.task")
	.factory("taskLoader", taskLoader);

taskLoader.$inject = ["taskDataService", "$q", "$route"];

function taskLoader(taskDataService, $q, $route){
    return function(){
        var delay = $q.defer();

        taskDataService.get({id: $route.current.params.id}, function(task){
            delay.resolve(task);
        }, function(){
            delay.reject("Unable to fetch task info");
        });
        
        return delay.promise;
    };
}