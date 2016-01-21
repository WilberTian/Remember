angular
	.module("remember.category")
	.factory("categoryDataService", categoryDataService);

categoryDataService.$inject = ["$resource"];

function categoryDataService($resource){
    return $resource("/remember/api/v1.0/categories/:id", {id: "@id"}, { update: { method: "PUT" }});
}