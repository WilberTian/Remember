angular
	.module("remember.task")
	.controller("EditTaskController", EditTaskController);

EditTaskController.$inject = ["$scope", "$location", "taskDataService", "task", "categories", "tags"];

function EditTaskController($scope, $location, taskDataService, task, categories, tags){
    $scope.mdEditorOptions = mdEditorOptions;
    
    $scope.task = task["task"];

    $scope.categoryInfo = {
        "categories": categories["categories"]
            
    };
    
    $scope.dimensions = dimensions;
    
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
            },
            function(){
                alert("fail to update task");
            }
        );
    };
       
    $scope.cancel = function(){
        $location.path("/");
    };
    
}