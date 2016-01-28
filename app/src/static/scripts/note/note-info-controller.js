angular
	.module("remember.note")
	.controller("NoteInfoController", NoteInfoController);

NoteInfoController.$inject = ["$scope", "noteDataService", "alertService", "notes", "confirmModalService", "noteGlobalVars"];

function NoteInfoController($scope, noteDataService, alertService, notes, confirmModalService, noteGlobalVars){
    $scope.items = _.map(notes["notes"], function(note){
        var item = {};
        item.note = note;
        item.status = {
            "viewMode": true,
            "preview": false
        };
        
        return item;
    });
    
    $scope.colors = noteGlobalVars.noteColors;

    $scope.noteOperations = {
        "createNote": function(){
            var inserted = {
                "note": {
                    "id": -1,
                    "content": "Not set",
                    "width": 2,
                    "color": "#bfeac7"
                },
                "status": {
                    "viewMode": false,
                    "preview": false
                }
            };
           
            $scope.items.push(inserted);
            
        },
        "deleteNote": function(id, index){
            var modalOptions = {
                closeButtonText: "Cancel",
                actionButtonText: "Delete",
                headerText: "Delete note?",
                bodyText: "Are you sure you want to delete this note?"
            };

            confirmModalService.showModal({}, modalOptions).then(function () {
            	noteDataService.delete({id: id}).$promise.then(
                    function(response){
                        $scope.items.splice(index, 1);
                        alertService.addAlert("success", "Success: note deleted!", 3000);
                    },
                    function(){
                        alertService.addAlert("danger", "Error: fail to delete note!", 3000);
                    }
                );
            }, function(){
                console.log('Modal dismissed at: ' + new Date());
            });
        },
        "updateNote": function(id, index){
            var note = $scope.items[index].note;
            
            if(id == -1){
                // create a new note
                delete note["id"]
                noteDataService.save(note).$promise.then(
                    function(response){
                        $scope.items[index].status.viewMode = true;
                        $scope.items[index].note = response["note"];
                        alertService.addAlert("success", "Success: note created!", 3000);
                    },
                    function(){
                        alertService.addAlert("danger", "Error: fail to create note!", 3000);
                    }
                );
            }
            else{
                // update the note
            	noteDataService.update({ id: id }, note).$promise.then(
                    function(response){
                        $scope.items[index].status.viewMode = true;
                        alertService.addAlert("success", "Success: note updated!", 3000);
                    },
                    function(){
                        alertService.addAlert("danger", "Error: fail to update note!", 3000);
                    }
                );
                
                
            }
        }
    };

    
}


