angular
	.module("remember.attachment")
	.filter("attachmentTag", attachmentTag);

function attachmentTag(){
	return function(attachments, tag){
		if(!tag || tag.trim() == ''){
			return attachments
		}
		
		return _.filter(attachments, function(attachment){
			var tags = attachment.tags;
			return _.some(tags, function(tagObj){
				return tagObj.name.toLowerCase().indexOf(tag) > -1;
			});
		});
	}
}