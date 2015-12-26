var app = angular.module("remember", ["xeditable", "ngRoute", "remember.taskServices", "remember.categoryServices", 
    "remember.tagServices", "remember.noteServices", "remember.attachmentServices", "remember.directives", "ui.bootstrap"]);

app.config(function($routeProvider){
    $routeProvider.
        when("/", {
            controller: "TastListController",
            resolve: {
                tasks: function(TaskListLoader){
                    return TaskListLoader();
                },
                categories: function(CategoryListLoader){
                    return CategoryListLoader();
                },
                
                tags: function(TagListLoader){
                    return TagListLoader();
                }
            },
            templateUrl: "list-task"
        }).
        when("/create", {
            controller: "CreateTaskController",
            resolve: {
                categories: function(CategoryListLoader){
                    return CategoryListLoader();
                },
                
                tags: function(TagListLoader){
                    return TagListLoader();
                }
       
            },
            templateUrl: "create-task"
        }).
        when("/edit/:id", {
            controller: "EditTaskController",
            resolve: {
                task: function(TaskLoader) {
                    return TaskLoader();
                },
                categories: function(CategoryListLoader){
                    return CategoryListLoader();
                },
                
                tags: function(TagListLoader){
                    return TagListLoader();
                }
            },
            templateUrl: "edit-task"
        }).when("/view/:id", {
            controller: "ViewTaskController",
            resolve: {
                task: function(TaskLoader) {
                    return TaskLoader();
                }
                
            },
            templateUrl: "view-task"
        }).when("/category-info", {
            controller: "CategoryInfoController", 
            resolve: {
                categories: function(CategoryListLoader){
                    return CategoryListLoader();
                }
            },
            templateUrl: "category-info"
        }).when("/tag-info", {
            controller: "TagInfoController", 
            resolve: {
                tags: function(TagListLoader){
                    return TagListLoader();
                }
            },
            templateUrl: "tag-info"
        }).when("/notes", {
            controller: "NoteInfoController", 
            resolve: {
                notes: function(NoteListLoader){
                    return NoteListLoader();
                }
            },
            templateUrl: "notes"
        }).when("/attachments", {
            controller: "AttachmentController", 
            resolve: {
                attachments: function(AttachmentListLoader){
                    return AttachmentListLoader();
                },
                tags: function(TagListLoader){
                    return TagListLoader();
                }
            },
            templateUrl: "attachments"
        }).otherwise({redirectTo:'/'});


});

