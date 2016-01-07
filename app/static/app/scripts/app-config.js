angular
	.module("remember")
	.config(config);


function config($routeProvider){
    $routeProvider.
        when("/", {
            controller: "TastListController",
            resolve: {
                tasks: function(taskListLoader){
                    return taskListLoader();
                },
                categories: function(categoryListLoader){
                    return categoryListLoader();
                },
                
                tags: function(tagListLoader){
                    return tagListLoader();
                }
            },
            templateUrl: "list-task"
        }).
        when("/create", {
            controller: "CreateTaskController",
            resolve: {
                categories: function(categoryListLoader){
                    return categoryListLoader();
                },
                
                tags: function(tagListLoader){
                    return tagListLoader();
                }
       
            },
            templateUrl: "create-task"
        }).
        when("/edit/:id", {
            controller: "EditTaskController",
            resolve: {
                task: function(taskLoader) {
                    return taskLoader();
                },
                categories: function(categoryListLoader){
                    return categoryListLoader();
                },
                
                tags: function(tagListLoader){
                    return tagListLoader();
                }
            },
            templateUrl: "edit-task"
        }).when("/view/:id", {
            controller: "ViewTaskController",
            resolve: {
                task: function(taskLoader) {
                    return taskLoader();
                }
                
            },
            templateUrl: "view-task"
        }).when("/category-info", {
            controller: "CategoryInfoController", 
            resolve: {
                categories: function(categoryListLoader){
                    return categoryListLoader();
                }
            },
            templateUrl: "category-info"
        }).when("/tag-info", {
            controller: "TagInfoController", 
            resolve: {
                tags: function(tagListLoader){
                    return tagListLoader();
                }
            },
            templateUrl: "tag-info"
        }).when("/notes", {
            controller: "NoteInfoController", 
            resolve: {
                notes: function(noteListLoader){
                    return noteListLoader();
                }
            },
            templateUrl: "notes"
        }).when("/attachments", {
            controller: "AttachmentController", 
            resolve: {
                attachments: function(attachmentListLoader){
                    return attachmentListLoader();
                },
                tags: function(tagListLoader){
                    return tagListLoader();
                }
            },
            templateUrl: "attachments"
        }).otherwise({redirectTo:'/'});


}

