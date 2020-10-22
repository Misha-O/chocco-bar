// const gulp = require("gulp");
// const clean = require("gulp-clean");

// gulp.task("clean", function () {
//   return gulp.src("app/tmp/**/*", { read: false }).pipe(rm());
// });
// gulp.task("copyScss", function () {
//   return src("/src/css/*.scss").pipe(dest("/src/scss"));
// });
// gulp.task("message", function () {
//   return console.log("It is finally running");
// });

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask;

// * top level functions
// * gulp.task - define tasks
// * gulp.src - point to files to use
// * gulp.dest - points to folder to output
// * gulp.watch - watch files and folders for changes
