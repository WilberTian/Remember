angular
	.module("remember.task")
	.controller("TastListController", TastListController);

TastListController.$inject = ["$scope", "tasks", "categories", "tags"];

function TastListController($scope, tasks, categories, tags) {
    $scope.tasks = tasks["tasks"];
    $scope.categories = categories["categories"];
    $scope.tags = tags["tags"];
    $scope.dimensions = dimensions;
    
    $scope.clearFilter = function(){
    	$scope.selectedCategory = null;
    	$scope.selectedTag = null;
    };
    
    $scope.taskStatus = ["All", "Complete", "Incomplete"];
    $scope.selectedStatus = "Incomplete";
}