import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import tsify from "tsify";

var paths = {
  pages: ["src/*.html"],
};
gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

gulp.task('copy-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-shaders', function() {
  return gulp.src('src/shaders/*.glsl')
    .pipe(gulp.dest('dist/shaders'));
});

gulp.task(
  "default",
  gulp.series(gulp.parallel("copy-html", "copy-css", "copy-shaders"), function () {
    return browserify({
      basedir: ".",
      debug: true,
      entries: ["src/ts/main.ts"],
      cache: {},
      packageCache: {},
    })
      .plugin(tsify)
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("dist"));
  })
);