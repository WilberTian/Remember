var gulp = require("gulp"),
      uglify = require("gulp-uglify"),
      clean = require("gulp-clean"),
      minifycss = require("gulp-minify-css"),
      cache = require("gulp-cache"),
      imagemin = require("gulp-imagemin"),
      htmlmin = require("gulp-htmlmin"),
      jslint = require("gulp-jslint"),
      modify = require("gulp-modify");

var paths = {
    scripts: ["app/static/app/scripts/**/*.js"],
    css: "app/static/app/css/main.css",
    images: "app/static/app/images/*",
    html: "app/templates/*"
};      
      
gulp.task("clean", function() {
    gulp.src(["app/static/app/build/", "app/templates/build/"], {read: false})
        .pipe(clean({force: true}));
});
      
gulp.task("minjs", function(){
    gulp.src(paths.scripts)
        .pipe(uglify({
            mangle: false,
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest("app/static/app/build/scripts"));
});

gulp.task("mincss", function(){
    gulp.src(paths.css)
        .pipe(minifycss())
        .pipe(gulp.dest("app/static/app/build/css"))
});

gulp.task("minhtml", function(){
    gulp.src(paths.html)
        .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, minifyCss: true}))
        .pipe(gulp.dest("app/templates/build/templates"));
});

gulp.task("minimage", function(){
    gulp.src(paths.images)
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest("app/static/app/build/images"))
});

gulp.task('modify', function(){
    setTimeout(function(){
        gulp.src("app/templates/build/templates/index.html")
        .pipe(modify({
            fileModifier: function(file, contents) {
                return contents.replace(/app\/css\/main.css/g, "app/build/css/main.css").replace(/app\/scripts/g, "app/build/scripts").replace(/app\/images/g, "app/build/images");
            }
        }))
        .pipe(gulp.dest("app/templates/build/templates"));
    }, 1000);
    
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
        gulp.start(["minjs", "mincss", "minhtml", "minimage", "modify"]);
    }, 100);
});