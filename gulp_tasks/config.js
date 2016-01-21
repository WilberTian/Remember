var path = require("path"),
	src = path.resolve(__dirname, "./../app"),
	dest = path.resolve(__dirname, "./../app/build");

var bower = {
    json: require("./../bower.json"),
    directory: "./bower_components/"
};

var nodeModules = "node_modules";


module.exports = {
    vendorScript: {
        src: [
			  src + "/static/app/lib/bower_components/angular/angular.min.js",
			  src + "/static/app/lib/bower_components/angular-resource/angular-resource.min.js",
			  src + "/static/app/lib/bower_components/angular-route/angular-route.min.js",
			  src + "/static/app/lib/bower_components/jquery/dist/jquery.min.js",
			  src + "/static/app/lib/bower_components/bootstrap/dist/js/bootstrap.min.js",
			  src + "/static/app/lib/bower_components/showdown/dist/showdown.min.js",
			  src + "/static/app/lib/bower_components/angular-xeditable/dist/js/xeditable.min.js",
			  src + "/static/app/lib/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
			  src + "/static/app/lib/bower_components/underscore/underscore-min.js",
			  src + "/static/app/lib/bower_components/codemirror/lib/codemirror.js",
			  src + "/static/app/lib/bower_components/codemirror/mode/markdown/markdown.js",
			  src + "/static/app/lib/bower_components/codemirror/keymap/sublime.js",
			  src + "/static/app/lib/bower_components/angular-ui-codemirror/ui-codemirror.min.js"
    	],
        dest: dest + "/static/lib"
    },
    
    userScript: {
        src: [
			   src + "/static/app/scripts/app-module.js",
			   src + "/static/app/scripts/app-config.js",
			   src + "/static/app/scripts/constants.js",
			   src + "/static/app/scripts/task/task-module.js",
			   src + "/static/app/scripts/task/controllers/task-list-controller.js",
			   src + "/static/app/scripts/task/controllers/task-create-controller.js",
			   src + "/static/app/scripts/task/controllers/task-edit-controller.js",
			   src + "/static/app/scripts/task/controllers/task-view-controller.js",
			   src + "/static/app/scripts/task/services/task-data-service.js",
			   src + "/static/app/scripts/task/services/task-loader-service.js",
			   src + "/static/app/scripts/task/services/task-list-loader-service.js",
			   src + "/static/app/scripts/task/filters/task-tag-filter.js",
			   src + "/static/app/scripts/task/filters/task-category-filter.js",
			   src + "/static/app/scripts/task/filters/task-status-filter.js",
			   src + "/static/app/scripts/category/category-module.js",
			   src + "/static/app/scripts/category/category-info-controller.js",
			   src + "/static/app/scripts/category/category-data-service.js",
			   src + "/static/app/scripts/category/category-list-loader-service.js",
			   src + "/static/app/scripts/tag/tag-module.js",
			   src + "/static/app/scripts/tag/tag-info-controller.js",
			   src + "/static/app/scripts/tag/tag-data-service.js",
			   src + "/static/app/scripts/tag/tag-list-loader-service.js",
			   src + "/static/app/scripts/note/note-module.js",
			   src + "/static/app/scripts/note/note-info-controller.js",
			   src + "/static/app/scripts/note/note-data-service.js",
			   src + "/static/app/scripts/note/note-list-loader-service.js",
			   src + "/static/app/scripts/attachment/attachment-module.js",
			   src + "/static/app/scripts/attachment/attachment-controller.js",
			   src + "/static/app/scripts/attachment/attachment-edit-modal-controller.js",
			   src + "/static/app/scripts/attachment/services/attachment-data-service.js",
			   src + "/static/app/scripts/attachment/services/attachment-list-loader-service.js",
			   src + "/static/app/scripts/attachment/services/attachment-uploader-service.js",
			   src + "/static/app/scripts/attachment/filters/attachment-tag-filter.js",
			   src + "/static/app/scripts/attachment/filters/attachment-name-filter.js",
			   src + "/static/app/scripts/attachment/filters/attachment-type-filter.js",
			   src + "/static/app/scripts/common/common-module.js",
			   src + "/static/app/scripts/common/services/confirm-modal-service.js",
			   src + "/static/app/scripts/common/services/alert-service.js",
			   src + "/static/app/scripts/common/directives/directives.js"
	    ],
        dest: dest + "/static/scripts"
    },
    
    html: {
        src: src + "/templates/*.html",     
        dest: dest + "/templates"
    },
    
    vendorCSS: {
        src: [
			src + "/static/app/lib/bower_components/bootstrap/dist/css/bootstrap.min.css",
			src + "/static/app/lib/bower_components/angular-xeditable/dist/css/xeditable.css",
			src + "/static/app/lib/bower_components/codemirror/lib/codemirror.css",
			src + "/static/app/lib/bower_components/codemirror/theme/twilight.css"
		],     
        dest: dest + "/static/css"
    },
    
    userCSS: {
        src: src + "/static/app/css/*.css",     
        dest: dest + "/static/css"
    },
    
    images: {
        src: src + "/static/app/images/*",     
        dest: dest + "/static/images"
    },
    
    clean: {
    	dest: dest
    }
}