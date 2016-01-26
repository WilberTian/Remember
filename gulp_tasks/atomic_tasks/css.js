var gulp = require("gulp"),
  	minifycss = require("gulp-minify-css"),
  	concat = require("gulp-concat");

/*
 * config
 */
var config = {
    vendorCSS: {
        fromVendor: [
			"./bower_components/bootstrap/dist/css/bootstrap.min.css",
			"./bower_components/angular-xeditable/dist/css/xeditable.css",
			"./bower_components/codemirror/lib/codemirror.css",
			"./bower_components/codemirror/theme/twilight.css"
		],     
		toSrc: "./app/src/static/vendor/css",
		src: "./app/src/static/vendor/css/*.css",
        dest: "./app/build/static/vendor/css"
    },
    
    userCSS: {
        src: "./app/src/static/css/*.css",     
        dest: "./app/build/static/css"
    }
};
  
/*
 * tasks
 */
gulp.task("importVendorCSS", function(){
    gulp.src(config.vendorCSS.fromVendor)
        .pipe(gulp.dest(config.vendorCSS.toSrc));
});

gulp.task("buildVendorCSS", function(){
    gulp.src(config.vendorCSS.fromVendor)
    	.pipe(minifycss())
    	.pipe(concat("lib.min.css"))
        .pipe(gulp.dest(config.vendorCSS.dest));
});
    
gulp.task("buildUserCSS", function(){
    gulp.src(config.userCSS.src)
        .pipe(minifycss())
        .pipe(concat("remember.min.css"))
        .pipe(gulp.dest(config.userCSS.dest));
});
