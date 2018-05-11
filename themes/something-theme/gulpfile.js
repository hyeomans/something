const gulp = require("gulp");
const postcss = require("gulp-postcss");
const purgecss = require("gulp-purgecss");
const tailwindcss = require("tailwindcss");
const { production, development } = require("gulp-environments");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");

const PATHS = {
  css: {
    src: "./source/_css/styles.css",
    tailwindConfig: "./tailwind.js",
    dist: "./source/css/"
  },
  js: {
    src: "./source/_js/app.js",
    dist: "./source/"
  },
  ejs: {
    src: `./layout/**/*.ejs`
  }
};

gulp.task("js", () => {
  return gulp
    .src(PATHS.js.src)
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulp.dest(PATHS.js.dist));
});

gulp.task("css", () => {
  return gulp
    .src(PATHS.css.src)
    .pipe(
      postcss([tailwindcss(PATHS.css.tailwindConfig), require("autoprefixer")])
    )
    .pipe(
      production(
        purgecss({
          content: [PATHS.ejs.src]
        })
      )
    )
    .pipe(production(cleanCSS()))
    .pipe(gulp.dest(PATHS.css.dist));
});
