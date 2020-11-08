var gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync"),
  svgSprite = require("gulp-svg-sprite"),
  svgo = require("gulp-svgo");

gulp.task("sass", function () {
  return gulp
    .src("app/scss/main.scss")
    .pipe(sass())
    .pipe(autoprefixer(["last 15 versions", ">1%", "ie 9"], { cascade: true }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("code", function () {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "app",
    },
    notify: false,
  });
});

gulp.task("icons", () => {
  return gulp
    .src("app/img/usedIcons/*.svg")
    .pipe(
      svgo({
        plugins: [
          {
            removeAttr: {
              attrs: "(fill|stroke|style|width|height|data.*)",
            },
          },
        ],
      })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "./sprite.svg",
          },
        },
      })
    )
    .pipe(gulp.dest("app/img/sprites"));
});

gulp.task("watch", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("app/*.html", gulp.parallel("code"));
  gulp.watch("app/js/**/*.js", gulp.parallel("code"));
  gulp.watch("./app/img/usedIcons/*.svg", gulp.series("icons"));
});

gulp.task(
  "default",
  gulp.parallel("sass", "browser-sync", "code", "icons", "watch")
);
