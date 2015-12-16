var dimensions = [
	{"id": 1, "name": "Important and Urgent"},
	{"id": 2, "name": "Important but not Urgent"},
	{"id": 3, "name": "Not Important but Urgent"},
	{"id": 4, "name": "Not Important and not Urgent"}
];

app.controller("TastListController", function($scope, tasks, categories, tags){
    $scope.tasks = tasks["tasks"];
    $scope.categories = categories["categories"];
    $scope.tags = tags["tags"];
    $scope.dimensions = dimensions;
});

app.controller("CreateTaskController", function($scope, $location, Task, categories, tags){
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
            console.log(this.selection);
        }
    };
    
    $scope.dimensions =dimensions;

    $scope.createTask = function(){
        $scope.task.tags = $scope.tagInfo.selection;
        $scope.task.dimension = $scope.task.dimension.id;
        
        Task.save($scope.task).$promise.then(
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
    
});

app.controller("EditTaskController", function($scope, $location, Task, task, categories, tags){
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
        
        Task.update({ id: $scope.task.id }, $scope.task).$promise.then(
            function(response){
                $location.path("/");
            },
            function(){
                alert("fail to update task");
            }
        );
    };
       
    $scope.cancel = function(){
        $location.path("/");
    };
    
});

app.controller("ViewTaskController", function($scope, $location, task, Task){
    $scope.task = task["task"];
    
    $scope.editTask = function(){
        $location.path("/edit/" + $scope.task.id);
    };
    
    $scope.deleteTask = function(){
        Task.delete({id: $scope.task.id}).$promise.then(
            function(response){
                $location.path("/");
            },
            function(){
                alert("fail to delete task");
            }
        );
        
    };
});



/*
app.controller("createTaskController", function($scope, $location, Task){
    $scope.createTask = function(task){
        Task.save(task).$promise.then(
            function(response){
                console.log(response);
                $location.path("/");
            },
            function(){
                alert("fail to update task");
            }
        );
    };
    
});

app.controller("editTaskController", function($scope, $routeParams, $location, Task){
    Task.get({id: $routeParams.id}).$promise.then(
                function(response){
                    $scope.task = response["task"];
                },
                function(){
                    alert("fail to get task info");
                }
            );
            
    $scope.updateTask = function(task){
        Task.update({ id: task.id }, task).$promise.then(
            function(response){
                console.log(response);
                $location.path("/");
            },
            function(){
                alert("fail to update task");
            }
        );
    };
});

app.controller("deleteTaskController", function($scope, $routeParams, $location, Task){
    Task.delete({id: $routeParams.id}).$promise.then(
        function(response){
            console.log(response);
            $location.path("/");
        },
        function(){
            alert("fail to delete task");
        }
    );
    
});

*/




/*
app.controller("taskController", function ($scope, taskService, $uibModal, $log) {

    $scope.taskOperations = {
        "addTask": function(){
            $scope.openCreateModal();

            
        },
        
        "deleteTask": function(task){
            taskService.deleteTask(task).$promise.then(
                function(){
                    $scope.tasks.splice($scope.tasks.indexOf(task), 1);
                },
                function(){
                    alert("fail to delete task");
                }
            );
        },
        
        "getTasks": function(){
            taskService.getTasks().$promise.then(
                function(response){
                    $scope.tasks = response["tasks"]
                },
                function(){
                    alert("fail to get tasks");
                }
            );
        },
        
        "editTask": function(task){
            $scope.selectedTask = task;
            $scope.openEditModal();
        }
    };

    $scope.taskOperations.getTasks();
    
    $scope.openEditModal = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'edit-task.html',
            controller: 'editTaskController',
            size: "lg",
            resolve: {
                    selectedTask: function () {
                    return $scope.selectedTask;
                }
            }
        });
        
        modalInstance.result.then(
            function (selectedTask) {
                $scope.selectedTask = selectedTask;
            }, 
            function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
    };
    
    $scope.openCreateModal = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'create-task.html',
            controller: 'createTaskController',
            size: "lg",
            
            
        });
        
        modalInstance.result.then(
            function (task) {
                //$scope.selectedTask = selectedTask;
                taskService.addTask(task).$promise.then(
                    function(){
                        $scope.tasks.push(task);
                    },
                    function(){
                        alert("fail to add task");
                    }
                );
            }, 
            function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
    };
    
});


app.controller('editTaskController', function ($scope, taskService, $uibModalInstance, selectedTask) {

    $scope.selectedTask = selectedTask;
    
    $scope.save = function (task) {
        taskService.updateTask(task);
        $uibModalInstance.close($scope.selectedTask);
    };
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('createTaskController', function ($scope, taskService, $uibModalInstance) {

    
    $scope.create = function (task) {
        $uibModalInstance.close(task);
    };
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


*/