angular
	.module("remember.tag")
	.factory("tagDataService", tagDataService);

tagDataService.$inject = ["$resource"];

function tagDataService($resource){
    return $resource("/remember/api/v1.0/tags/:id", {id: "@id"}, { update: { method: "PUT" }});
}   
