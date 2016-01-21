var gulp = require("gulp");    

config = {
		
};

gulp.task("initDevEnv", function(){
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

