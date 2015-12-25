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

