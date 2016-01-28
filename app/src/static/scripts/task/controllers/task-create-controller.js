angular
	.module("remember.task")
	.controller("CreateTaskController", CreateTaskController);

CreateTaskController.$inject = ["$scope", "$location", "taskDataService", "alertService", "categories", "tags"];

function CreateTaskController($scope, $location, taskDataService, alertService, categories, tags){
	$scope.mdEditorconfig = {
    	"mdEditorOptions": globalVar.remember.mdEditorOptions,
    	"previewMode": false,
    	"fullscreenMode": false,
    	"refreshEditor": false
    }

    $scope.categoryInfo = {
            "categories": categories["categories"], 
    };
    
    $scope.tagInfo = {
        "tags": tags["tags"],
        "selection": [],
        "toggleSelection": function(tag){

            var idx = this.selection.indexOf(tag);
            if (idx > -1) {
                this.selection.splice(idx, 1);
            }
            else {
                this.selection.push(tag);
            }

        }
    };
    
    $scope.dimensions =globalVar.remember.dimensions;

    $scope.createTask = function(){
        $scope.task.tags = $scope.tagInfo.selection;
        $scope.task.dimension = $scope.task.dimension.id;
        
        taskDataService.save($scope.task).$promise.then(
            function(response){
                $location.path("/view/" + response["task"].id);
                alertService.addAlert("success", "Success: task created!", 3000);
            },
            function(){
                alertService.addAlert("danger", "Error: fail to create task!", 3000);
            }
        );
    };
    
    $scope.cancel = function(){
        $location.path("/");
    };
    
}