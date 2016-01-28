var gulp = require("gulp"),
  	uglify = require("gulp-uglify"),
  	concat = require("gulp-concat");    

/*
 * config
 */
var config = {
	vendorScript: {
	    fromVendor: [
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
	    toSrc: "./app/src/static/vendor/scripts",
	    src: "./app/src/static/vendor/scripts/*.js",
	    dest: "./app/build/static/vendor/scripts"
	},
	
	userScript: {
	    src: [
            "./app/src/static/scripts/app-module.js",
            "./app/src/static/scripts/app-config.js",
            "./app/src/static/scripts/constants.js",
            "./app/src/static/scripts/task/task-module.js",
            "./app/src/static/scripts/task/controllers/task-list-controller.js",
            "./app/src/static/scripts/task/controllers/task-create-controller.js",
            "./app/src/static/scripts/task/controllers/task-edit-controller.js",
            "./app/src/static/scripts/task/controllers/task-view-controller.js",
            "./app/src/static/scripts/task/services/task-data-service.js",
            "./app/src/static/scripts/task/services/task-loader-service.js",
            "./app/src/static/scripts/task/services/task-list-loader-service.js",
            "./app/src/static/scripts/task/filters/task-tag-filter.js",
            "./app/src/static/scripts/task/filters/task-category-filter.js",
            "./app/src/static/scripts/task/filters/task-status-filter.js",
            "./app/src/static/scripts/category/category-module.js",
            "./app/src/static/scripts/category/category-info-controller.js",
            "./app/src/static/scripts/category/category-data-service.js",
            "./app/src/static/scripts/category/category-list-loader-service.js",
            "./app/src/static/scripts/tag/tag-module.js",
            "./app/src/static/scripts/tag/tag-info-controller.js",
            "./app/src/static/scripts/tag/tag-data-service.js",
            "./app/src/static/scripts/tag/tag-list-loader-service.js",
            "./app/src/static/scripts/note/note-module.js",
            "./app/src/static/scripts/note/note-info-controller.js",
            "./app/src/static/scripts/note/note-data-service.js",
            "./app/src/static/scripts/note/note-list-loader-service.js",
            "./app/src/static/scripts/note/note-elastic-directive.js",
            "./app/src/static/scripts/attachment/attachment-module.js",
            "./app/src/static/scripts/attachment/attachment-controller.js",
            "./app/src/static/scripts/attachment/attachment-edit-modal-controller.js",
            "./app/src/static/scripts/attachment/attachment-select-directive.js",
            "./app/src/static/scripts/attachment/services/attachment-data-service.js",
            "./app/src/static/scripts/attachment/services/attachment-list-loader-service.js",
            "./app/src/static/scripts/attachment/services/attachment-uploader-service.js",
            "./app/src/static/scripts/attachment/filters/attachment-tag-filter.js",
            "./app/src/static/scripts/attachment/filters/attachment-name-filter.js",
            "./app/src/static/scripts/attachment/filters/attachment-type-filter.js",
            "./app/src/static/scripts/common/common-module.js",
            "./app/src/static/scripts/common/services/confirm-modal-service.js",
            "./app/src/static/scripts/common/services/alert-service.js",
            "./app/src/static/scripts/common/directives/auto-focus-directive.js",
            "./app/src/static/scripts/common/directives/markdown-convert-directive.js",
            "./app/src/static/scripts/common/directives/editor-fullscreen-directive.js",
            "./app/src/static/scripts/common/directives/preview-fullscreen-directive.js"
	    ],
	    dest: "./app/build/static/scripts"
	}
};

/*
 * tasks
 */
gulp.task("importVendorScript", function(){
    gulp.src(config.vendorScript.fromVendor)
        .pipe(gulp.dest(config.vendorScript.toSrc));
});

gulp.task("buildVendorScript", function(){
    gulp.src(config.vendorScript.fromVendor)
        .pipe(uglify({
            mangle: false,
            compress: {
                drop_console: true
            }
        }))
        .pipe(concat("lib.min.js"))
        .pipe(gulp.dest(config.vendorScript.dest));
});

gulp.task("buildUserScript", function(){
    gulp.src(config.userScript.src)
        .pipe(uglify({
            mangle: false,
            compress: {
                drop_console: true
            }
        }))
        .pipe(concat("remember.min.js"))
        .pipe(gulp.dest(config.userScript.dest));
});

