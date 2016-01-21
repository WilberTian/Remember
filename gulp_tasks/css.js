var gulp = require("gulp"),
  	minifycss = require("gulp-minify-css"),
  	concat = require("gulp-concat");

var config = {
    vendorCSS: {
        src: [
			"./bower_components/bootstrap/dist/css/bootstrap.min.css",
			"./bower_components/angular-xeditable/dist/css/xeditable.css",
			"./bower_components/codemirror/lib/codemirror.css",
			"./bower_components/codemirror/theme/twilight.css"
		],     
        dest: "./app/src/static/vendor/css"
    },
    
    userCSS: {
        src: "/static/app/css/*.css",     
        dest: "/static/css"
    }
};
    
gulp.task("vendorCSS", function(){
    gulp.src(config.vendorCSS.src)
        .pipe(gulp.dest(config.vendorCSS.dest));
});
    

    
gulp.task("css", function(){
    gulp.src(userCSSConfig.src)
        .pipe(minifycss())
        .pipe(concat("remember.min.css"))
        .pipe(gulp.dest(userCSSConfig.dest));
    
    gulp.src(vendorCSSConfig.src)
	    .pipe(minifycss())
	    .pipe(gulp.dest(vendorCSSConfig.dest));
});
