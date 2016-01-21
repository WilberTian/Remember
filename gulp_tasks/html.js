var gulp = require("gulp"),
  	htmlmin = require("gulp-htmlmin"),
  	modify = require("gulp-modify");

gulp.task("html", function(){
    gulp.src(config.src)
        //.pipe(htmlmin({collapseWhitespace: true, minifyJS: true, minifyCss: true}))
        .pipe(gulp.dest(config.dest));
});

