var gulp = require("gulp"),
  	clean = require("gulp-clean");

gulp.task("clean", function() {
    gulp.src(config.dest, { read: false })
        .pipe(clean({force: true}));
});