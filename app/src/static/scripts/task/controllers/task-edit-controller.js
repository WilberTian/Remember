angular
	.module("remember.task")
	.controller("EditTaskController", EditTaskController);

EditTaskController.$inject = ["$scope", "$location", "taskDataService", "alertService", "task", "categories", "tags", "taskGlobalVars"];

function EditTaskController($scope, $location, taskDataService, alertService, task, categories, tags, taskGlobalVars){
    $scope.mdEditorconfig = {
    	"mdEditorOptions": taskGlobalVars.mdEditorOptions,
    	"previewMode": false,
    	"fullscreenMode": false,
    	"refreshEditor": false
    }
    
    $scope.task = task["task"];

    $scope.categoryInfo = {
        "categories": categories["categories"]
            
    };
    
    $scope.dimensions = taskGlobalVars.dimensions;
    
    $scope.task.dimension = $scope.dimensions[$scope.task.dimension-1];

    $scope.tagInfo = {
        "tags": tags["tags"],
        "selection": $scope.task.tags,
        "findTagById": function(id){
            for(var i = 0; i < this.selection.length; i++){
                if(this.selection[i]["id"] == id){
                    return i;
                }
            }
            return -1;
        },
        "toggleSelection": function(tag){
            console.log(tag);
            var idx = this.findTagById(tag.id);
            console.log(idx);
            if (idx > -1) {
                this.selection.splice(idx, 1);
            }
            else {
                this.selection.push(tag);
            }
            console.log(this.selection);
        }
    };
    
    
    $scope.updateTask = function(){
        $scope.task.tags = $scope.tagInfo.selection;
        $scope.task.dimension = $scope.task.dimension.id;

        taskDataService.update({ id: $scope.task.id }, $scope.task).$promise.then(
            function(response){
                $location.path("/view/" + response["task"].id);
                alertService.addAlert("success", "Success: task updated!", 3000);
            },
            function(){
                alertService.addAlert("danger", "Error: fail to update task!", 3000);
            }
        );
    };
       
    $scope.cancel = function(){
        $location.path("/");
    };
    
}