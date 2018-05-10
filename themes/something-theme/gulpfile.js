const gulp = require("gulp");
const postcss = require("gulp-postcss");
const purgecss = require("gulp-purgecss");
const tailwindcss = require("tailwindcss");

const PATHS = {
  css: {
    src: "./source/_css/styles.css",
    tailwindConfig: "./tailwind.js",
    dist: "./source/css/"
  },
  ejs: {
    src: `./layout/**/*.ejs`
  }
};

gulp.task("css", () => {
  return (
    gulp
      .src(PATHS.css.src)
      .pipe(
        postcss([
          tailwindcss(PATHS.css.tailwindConfig),
          require("autoprefixer")
        ])
      )
      //TODO: For Prod build make sure this is ran.
      // .pipe(
      //   purgecss({
      //     content: [PATHS.ejs.src]
      //   })
      // )
      .pipe(gulp.dest(PATHS.css.dist))
  );
});
