var taskServices = angular.module("remember.taskServices", ["ngResource"]);

taskServices.factory("Task", function($resource){
    return $resource("/remember/api/v1.0/tasks/:id", {id: "@id"}, { update: { method: "PUT" }});
});     

taskServices.factory("TaskListLoader", function(Task, $q){
    return function(){
        var delay = $q.defer();
        
        Task.get(function(tasks){
            delay.resolve(tasks);
        }, function(){
            delay.reject("Unable to fetch tasks");
        });
        
        return delay.promise;
    }
});    

taskServices.factory("TaskLoader", function(Task, $q, $route){
    return function(){
        var delay = $q.defer();

        Task.get({id: $route.current.params.id}, function(task){
            delay.resolve(task);
        }, function(){
            delay.reject("Unable to fetch task info");
        });
        
        return delay.promise;
    };
});