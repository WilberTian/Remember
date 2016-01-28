angular
	.module("remember.task")
	.controller("TastListController", TastListController);

TastListController.$inject = ["$scope", "tasks"];

function TastListController($scope, tasks) {
    $scope.tasks = tasks["tasks"];

    $scope.categories = (function(tasks){
    	var allCategories = _.map(tasks, function(task){
        	return task.category;
        });
    	
    	return _.uniq(allCategories, function(category){
    		return category.id;
    	});

    })(tasks["tasks"]);
  
    $scope.tags = (function(tasks){
    	var allTags = _.map(tasks, function(task){
        	return task.tags;
        });
    	
    	allTags = _.flatten(allTags);
    	
    	return _.uniq(allTags, function(tag){
    		return tag.id;
    	});
    })(tasks["tasks"]);
    
    $scope.dimensions = globalVar.remember.dimensions;
    
    $scope.clearFilter = function(){
    	$scope.selectedCategory = null;
    	$scope.selectedTag = null;
    };

    $scope.taskStatus = globalVar.remember.taskStatusArray;
    $scope.selectedStatus = "Incomplete";
}
