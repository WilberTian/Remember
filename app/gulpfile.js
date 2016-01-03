var gulp = require("gulp"),
      uglify = require("gulp-uglify"),
      clean = require("gulp-clean"),
      minifycss = require("gulp-minify-css"),
      cache = require("gulp-cache"),
      imagemin = require("gulp-imagemin"),
      htmlmin = require("gulp-htmlmin"),
      jslint = require("gulp-jslint")

var paths = {
    scripts: ["static/app/scripts/**/*.js"],
    css: "static/app/css/main.css",
    images: "static/app/images/*",
    html: "templates/*"
};      
      
gulp.task("clean", function() {
    gulp.src(["static/app/build/"], {read: false})
        .pipe(clean({force: true}));
});
      
gulp.task("minjs", function(){
    gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(gulp.dest("static/app/build/scripts"));
});

gulp.task("mincss", function(){
    gulp.src(paths.css)
        .pipe(minifycss())
        .pipe(gulp.dest("static/app/build/css"))
});

gulp.task("minhtml", function(){
    gulp.src(paths.html)
        .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, minifyCss: true}))
        .pipe(gulp.dest("static/app/build/templates"));
});

gulp.task("minimage", function(){
    gulp.src(paths.images)
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest("static/app/build/images"))
});

gulp.task("jslint", function(){
    return gulp.src(paths.scripts)
        .pipe(jslint({
            sloppy: true,
            plusplus: true,
            unparam: true,
            stupid: true
        }))
        .on("error", function (error) {
            console.error(String(error));
        });
});

gulp.task("watch", function() {
    gulp.watch(paths.scripts, ["minjs"]);
    gulp.watch(paths.css, ["mincss"]);
});

gulp.task("default", ["clean"], function(){
    setTimeout(function(){
        gulp.start(["minjs", "mincss", "minhtml", "minimage"]);
    }, 100);
});