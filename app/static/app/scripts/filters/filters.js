var filters = angular.module("remember.filters", []);

filters.filter("attachmentName", function(){
	return function(attachments, name){
		if(!name || name.trim() == ''){
			return attachments
		}
		
		return _.filter(attachments, function(attachment){
			return attachment.name.toLowerCase().indexOf(name) > -1;
		});
	}
});

filters.filter("attachmentType", function(){
	return function(attachments, type){
		if(!type || type.trim() == ''){
			return attachments
		}
		
		return _.filter(attachments, function(attachment){
			return attachment.type.toLowerCase().indexOf(type) > -1;
		});
	}
});

filters.filter("attachmentTags", function(){
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
});