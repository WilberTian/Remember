var dimensions = [
	{"id": 1, "name": "Important and Urgent"},
	{"id": 2, "name": "Important but not Urgent"},
	{"id": 3, "name": "Not Important but Urgent"},
	{"id": 4, "name": "Not Important and not Urgent"}
];


var mdEditorOptions = {
    lineNumbers: true, 
    theme:"twilight", 
    lineWrapping : true, 
    mode: "markdown", 
    keyMap: "sublime", 
    smartIndent: true, 
    showCursorWhenSelecting: true,
    extraKeys: {
        "Esc": function(cm) {
            if (cm.getOption("fullScreen")) {
                cm.setOption("fullScreen", false);
                $(".description-preview").parent().addClass("ng-hide");
                $(".description-preview").removeClass("CodeMirror-preview-fullscreen");
            }
        },
        "F11": function(cm) {
            if (!cm.getOption("fullScreen")) {
                cm.setOption("fullScreen", true);
                $(".description-preview").parent().removeClass("ng-hide");
                $(".description-preview").addClass("CodeMirror-preview-fullscreen");
            }
        }   
    }
};

angular
	.module("remember")
	.controller("TastListController", TastListController);
			
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

angular
	.module("remember")
	.controller("CreateTaskController", CreateTaskController);

function CreateTaskController($scope, $location, taskDataService, categories, tags){
    $scope.mdEditorOptions = mdEditorOptions;
    
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
        
        taskDataService.save($scope.task).$promise.then(
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

angular
	.module("remember")
	.controller("EditTaskController", EditTaskController);

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

angular
	.module("remember")
	.controller("ViewTaskController", ViewTaskController);

ViewTaskController.$inject = ["$scope", "$location", "task", "taskDataService", "confirmModalService"];

function ViewTaskController($scope, $location, task, taskDataService, confirmModalService){
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
                },
                function(){
                    alert("fail to delete task");
                }
            );
        }, function(){
            console.log("Modal dismissed at: " + new Date());
        });
    };
}

