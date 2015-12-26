app.controller("NoteInfoController", function($scope, Note, notes, ConfirmModalService){
    $scope.items = []
    
    for(var i = 0; i < notes["notes"].length; i++){
        $scope.items[i] = {};
        $scope.items[i].note = notes["notes"][i];
        $scope.items[i].status = {
            "viewMode": true,
            "preview": false
        };
    }

    $scope.noteOperations = {
        "createNote": function(){
            var inserted = {
                "note": {
                    "id": -1,
                    "content": "Not set",
                    "width": 2
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

            ConfirmModalService.showModal({}, modalOptions).then(function () {
                Note.delete({id: id}).$promise.then(
                    function(response){
                        $scope.items.splice(index, 1);
                    },
                    function(){
                        alert("fail to delete note");
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
                Note.save(note).$promise.then(
                    function(response){
                        $scope.items[index].status.viewMode = true;
                        $scope.items[index].note = response["note"];
                    },
                    function(){
                        alert("fail to create note");
                    }
                );
            }
            else{
                // update the note
                Note.update({ id: id }, note).$promise.then(
                    function(response){
                        $scope.items[index].status.viewMode = true;
                    },
                    function(){
                        alert("fail to update note");
                    }
                );
                
                
            }
        }
    };

    
});


