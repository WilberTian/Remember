var gulp = require("gulp"),
  	clean = require("gulp-clean");

/*
 * config
 */
var config = {
	build: {
    	dest: "./app/build/"
    },
    
    importedVendorLib: {
    	dest: "./app/src/static/vendor/"
    }
};

/*
 * tasks
 */
gulp.task("cleanBuild", function() {
    return gulp.src(config.build.dest, { read: false })
        .pipe(clean({force: true}));
});

gulp.task("cleanImportedVendorLib", function() {
    return gulp.src(config.importedVendorLib.dest, { read: false })
        .pipe(clean({force: true}));
});