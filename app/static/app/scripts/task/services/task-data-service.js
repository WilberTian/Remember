angular
	.module("remember.task")
	.factory("taskDataService", taskDataService);

taskDataService.$inject = ["$resource"];

function taskDataService($resource){
    return $resource("/remember/api/v1.0/tasks/:id", {id: "@id"}, { update: { method: "PUT" }});
}  