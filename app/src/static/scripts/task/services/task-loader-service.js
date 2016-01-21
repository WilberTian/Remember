angular
	.module("remember.task")
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