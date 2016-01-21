var gulp = require("gulp"),
  	uglify = require("gulp-uglify"),
  	concat = require("gulp-concat");    

var config = {
	vendorScript: {
	    src: [
            "./bower_components/angular/angular.min.js",
            "./bower_components/angular-resource/angular-resource.min.js",
            "./bower_components/angular-route/angular-route.min.js",
            "./bower_components/jquery/dist/jquery.min.js",
            "./bower_components/bootstrap/dist/js/bootstrap.min.js",
            "./bower_components/showdown/dist/showdown.min.js",
            "./bower_components/angular-xeditable/dist/js/xeditable.min.js",
            "./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
            "./bower_components/underscore/underscore-min.js",
            "./bower_components/codemirror/lib/codemirror.js",
            "./bower_components/codemirror/mode/markdown/markdown.js",
            "./bower_components/codemirror/keymap/sublime.js",
            "./bower_components/angular-ui-codemirror/ui-codemirror.min.js"
		],
	    dest: "./app/src/static/vendor/scripts"
	},
	
	userScript: {
	    src: [
            "/static/app/scripts/app-module.js",
            "/static/app/scripts/app-config.js",
            "/static/app/scripts/constants.js",
            "/static/app/scripts/task/task-module.js",
            "/static/app/scripts/task/controllers/task-list-controller.js",
            "/static/app/scripts/task/controllers/task-create-controller.js",
            "/static/app/scripts/task/controllers/task-edit-controller.js",
            "/static/app/scripts/task/controllers/task-view-controller.js",
            "/static/app/scripts/task/services/task-data-service.js",
            "/static/app/scripts/task/services/task-loader-service.js",
            "/static/app/scripts/task/services/task-list-loader-service.js",
            "/static/app/scripts/task/filters/task-tag-filter.js",
            "/static/app/scripts/task/filters/task-category-filter.js",
            "/static/app/scripts/task/filters/task-status-filter.js",
            "/static/app/scripts/category/category-module.js",
            "/static/app/scripts/category/category-info-controller.js",
            "/static/app/scripts/category/category-data-service.js",
            "/static/app/scripts/category/category-list-loader-service.js",
            "/static/app/scripts/tag/tag-module.js",
            "/static/app/scripts/tag/tag-info-controller.js",
            "/static/app/scripts/tag/tag-data-service.js",
            "/static/app/scripts/tag/tag-list-loader-service.js",
            "/static/app/scripts/note/note-module.js",
            "/static/app/scripts/note/note-info-controller.js",
            "/static/app/scripts/note/note-data-service.js",
            "/static/app/scripts/note/note-list-loader-service.js",
            "/static/app/scripts/attachment/attachment-module.js",
            "/static/app/scripts/attachment/attachment-controller.js",
            "/static/app/scripts/attachment/attachment-edit-modal-controller.js",
            "/static/app/scripts/attachment/services/attachment-data-service.js",
            "/static/app/scripts/attachment/services/attachment-list-loader-service.js",
            "/static/app/scripts/attachment/services/attachment-uploader-service.js",
            "/static/app/scripts/attachment/filters/attachment-tag-filter.js",
            "/static/app/scripts/attachment/filters/attachment-name-filter.js",
            "/static/app/scripts/attachment/filters/attachment-type-filter.js",
            "/static/app/scripts/common/common-module.js",
            "/static/app/scripts/common/services/confirm-modal-service.js",
            "/static/app/scripts/common/services/alert-service.js",
            "/static/app/scripts/common/directives/directives.js"
	    ],
	    dest: "/static/scripts"
	}
};

gulp.task("vendorScript", function(){
    gulp.src(config.vendorScript.src)
        .pipe(gulp.dest(config.vendorScript.dest));
});

gulp.task("javascript", function(){
    gulp.src(userScriptConfig.src)
        .pipe(uglify({
            mangle: false,
            compress: {
                drop_console: true
            }
        }))
        .pipe(concat("remember.min.js"))
        .pipe(gulp.dest(userScriptConfig.dest));
    
    gulp.src(vendorScriptConfig.src)
	    .pipe(uglify({
	        mangle: false,
	        compress: {
	            drop_console: true
	        }
	    }))
	    .pipe(gulp.dest(vendorScriptConfig.dest));
});

