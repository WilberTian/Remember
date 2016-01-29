angular
	.module("remember.attachment")
	.filter("attachmentName", attachmentName);

function attachmentName(){
	return function(attachments, name){
		if(!name || name.trim() === ""){
			return attachments;
		}
		
		return _.filter(attachments, function(attachment){
			return attachment.name.toLowerCase().indexOf(name) > -1;
		});
	};
}