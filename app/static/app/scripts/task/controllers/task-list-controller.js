angular
	.module("remember.task")
	.controller("TastListController", TastListController);

TastListController.$inject = ["$scope", "tasks"];

function TastListController($scope, tasks) {
    $scope.tasks = tasks["tasks"];

    $scope.categories = getCategoriesFromTasks(tasks["tasks"]);
  
    $scope.tags = getTagsFromTasks(tasks["tasks"]);
    
    $scope.dimensions = dimensions;
    
    $scope.clearFilter = function(){
    	$scope.selectedCategory = null;
    	$scope.selectedTag = null;
    };
    
    $scope.taskStatus = taskStatus;
    $scope.selectedStatus = "Incomplete";
}

function getCategoriesFromTasks(tasks){
	var allCategories = _.map(tasks, function(task){
    	return task.category;
    });
	
	return _.uniq(allCategories, function(category){
		return category.id;
	});

}

function getTagsFromTasks(tasks){
	var allTags = _.map(tasks, function(task){
    	return task.tags;
    });
	
	allTags = _.flatten(allTags);
	
	return _.uniq(allTags, function(tag){
		return tag.id;
	});
	
}