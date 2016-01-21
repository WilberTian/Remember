angular
	.module("remember.task")
	.controller("ViewTaskController", ViewTaskController);

ViewTaskController.$inject = ["$scope", "$location", "alertService", "task", "taskDataService", "confirmModalService"];

function ViewTaskController($scope, $location, alertService, task, taskDataService, confirmModalService){
    $scope.task = task["task"];
    
    $scope.editTask = function(){
        $location.path("/edit/" + $scope.task.id);
    };
    
    $scope.deleteTask = function(){
    
        var modalOptions = {
            closeButtonText: "Cancel",
            actionButtonText: "Delete",
            headerText: "Delete " + $scope.task.name + "?",
            bodyText: "Are you sure you want to delete " + $scope.task.name + "?"
        };
        
        confirmModalService.showModal({}, modalOptions).then(function () {
        	taskDataService.delete({id: $scope.task.id}).$promise.then(
                function(response){
                    $location.path("/");
                    alertService.addAlert("success", "Success: task deleted!", 3000);
                },
                function(){
                    alertService.addAlert("danger", "Error: fail to delete task!", 3000);
                }
            );
        }, function(){
            console.log("Modal dismissed at: " + new Date());
        });
    };
}