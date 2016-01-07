angular
	.module("remember.note")
	.factory("noteDataService", noteDataService);

noteDataService.$inject = ["$resource"];

function noteDataService($resource){
    return $resource("/remember/api/v1.0/notes/:id", {id: "@id"}, { update: { method: "PUT" }});
}     

