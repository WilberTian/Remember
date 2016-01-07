var taskServices = angular.module("remember.taskServices", ["ngResource"]);

angular
	.module("remember.taskServices")
	.factory("taskDataService", taskDataService);

taskDataService.$inject = ["$resource"];

function taskDataService($resource){
    return $resource("/remember/api/v1.0/tasks/:id", {id: "@id"}, { update: { method: "PUT" }});
}  



angular
	.module("remember.taskServices")
	.factory("taskListLoader", taskListLoader);

taskListLoader.$inject = ["taskDataService", "$q"];

function taskListLoader(taskDataService, $q){
    return function(){
        var delay = $q.defer();
        
        taskDataService.get(function(tasks){
            delay.resolve(tasks);
        }, function(){
            delay.reject("Unable to fetch tasks");
        });
        
        return delay.promise;
    }
}


angular
	.module("remember.taskServices")
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