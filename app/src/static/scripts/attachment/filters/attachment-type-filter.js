angular
	.module("remember.attachment")
	.filter("attachmentType", attachmentType);

function attachmentType(){
	return function(attachments, type){
		if(!type || type.trim() === ""){
			return attachments;
		}
		
		return _.filter(attachments, function(attachment){
			return attachment.type.toLowerCase().indexOf(type) > -1;
		});
	};
}
