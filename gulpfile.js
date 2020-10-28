const { src, dest, task, series, watch, parallel } = require("gulp");
const clean = require("gulp-clean");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const browserReload = browserSync.reload;
const pxtorem = require("gulp-pxtorem");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const { reload } = require("browser-sync");
const svgo = require("gulp-svgo");
const svgSprite = require("gulp-svg-sprite");
const gulpif = require("gulp-if");

const { SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS } = require("./gulp.config");
sass.compiler = require("node-sass");

task("clean", () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(clean());
});

task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(`${DIST_PATH}`))
    .pipe(browserReload({ stream: true }));
});

// styles dev
task("styles", () => {
  return (
    src(...STYLES_LIBS, "app/scss/main.scss")
      .pipe(concat("main.css"))
      .pipe(sassGlob())
      .pipe(sass().on("error", sass.logError))
      .pipe(pxtorem())
      .pipe(
        autoprefixer({
          cascade: false,
        })
      )
      .pipe(gcmq())
      // .pipe(cleanCSS())
      .pipe(reload({ stream: true }))
      .pipe(dest(`${SRC_PATH}/css`))
  );
});
// styles prod
// task("styles", () => {
//   return src([...STYLES_LIBS, "app/scss/main.scss"])
//     .pipe(gulpif(env === "dev", sourcemaps.init()))
//     .pipe(concat("main.min.scss"))
//     .pipe(sassGlob())
//     .pipe(sass().on("error", sass.logError))
//     .pipe(pxtorem())
//     .pipe(
//       gulpif(
//         env === "dev",
//         autoprefixer({
//           cascade: false,
//         })
//       )
//     )
//     .pipe(gulpif(env === "prod", gcmq()))
//     .pipe(gulpif(env === "prod", cleanCSS()))
//     .pipe(gulpif(env === "dev", sourcemaps.write()))
//     .pipe(reload({ stream: true }))
//     .pipe(dest(`${DIST_PATH}`));
// });

// scripts dev
task("scripts", () => {
  return src([...JS_LIBS, "app/js/components/*.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("index.js", { newline: ";" }))
    .pipe(sourcemaps.write())
    .pipe(reload({ stream: true }))
    .pipe(dest(`${SRC_PATH}/js`));
});

// scripts prod
// task("scripts", () => {
//   return src([...JS_LIBS, "app/js/components/*.js"])
//     .pipe(gulpif(env === "dev", sourcemaps.init()))
//     .pipe(concat("index.min.js", { newline: ";" }))
//     .pipe(
//       gulpif(
//         env === "prod",
//         babel({
//           presets: ["@babel/env"],
//         })
//       )
//     )
//     .pipe(gulpif(env === "prod", uglify()))
//     .pipe(gulpif(env === "dev", sourcemaps.write()))
//     .pipe(reload({ stream: true }))
//     .pipe(dest(`${DIST_PATH}`));
// });

task("icons", () => {
  return src(`${SRC_PATH}/img/usedIcons/*.svg`)
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
    .pipe(dest(`${SRC_PATH}/img/icons`));
});

task("server", () => {
  browserSync.init({
    server: {
      baseDir: `${SRC_PATH}`,
    },
    open: false,
  });
});

// watchers
task("watch", () => {
  watch("./app/scss/**/*.scss", series("styles"));
  watch("./app/*.html", series("copy:html"));
  watch("./app/js/*.js", series("scripts"));
  watch("./app/img/usedIcons/*.svg", series("icons"));
});

// default
task("default", parallel("styles", "scripts", "icons"), series("watch"));

// task(
//   "default",
//   series(
//     "clean",
//     parallel("copy:html", "styles", "scripts", "icons"),
//     parallel("watch", "server")
//   )
// );
// task(
//   "default",
//   series(
//     "clean",
//     parallel("copy:html", "styles", "scripts", "icons"),
//     parallel("watch", "server")
//   )
// );
