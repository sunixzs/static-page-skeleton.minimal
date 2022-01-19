"use strict";
const sass = require("gulp-sass")(require("sass"));

const sourcemaps = require("gulp-sourcemaps");
// const sass = require("gulp-sass");
// sass.compiler = require("dart-sass");

const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sassConfig = {
    production: {
        sourceMap: false,
        outputStyle: "compressed",
    },
    staging: {
        sourceMap: false,
        outputStyle: "compressed",
    },
    development: {
        indentType: "space",
        indentWidth: 4,
        sourceMap: true,
        outputStyle: "expanded",
    },
};

/**
 * Task to render css out of scss.
 */
module.exports = (gulp, plugins, ENV, config) => {
    return () => {
        let mergedStreams = require("merge-stream")();
        let scssPlugins = [autoprefixer()];

        for (let key in config.styles.files) {
            console.log(plugins.color("scss -> css: ", "BLUE") + plugins.color(key, "CYAN"));
            console.log(plugins.color("         to: ", "BLUE") + plugins.color(config.styles.files[key], "CYAN"));

            if (ENV.sourcemaps) {
                var stream = gulp
                    .src(key)
                    .pipe(sourcemaps.init())
                    .pipe(ENV.mode.development(sass(sassConfig.development).on("error", sass.logError)))
                    .pipe(ENV.mode.production(sass(sassConfig.production).on("error", sass.logError)))
                    .pipe(ENV.mode.staging(sass(sassConfig.staging).on("error", sass.logError)))
                    .pipe(postcss(scssPlugins))
                    .pipe(sourcemaps.write("./"))
                    .pipe(gulp.dest(config.styles.files[key]));
            } else {
                var stream = gulp
                    .src(key)
                    .pipe(ENV.mode.development(sass(sassConfig.development).on("error", sass.logError)))
                    .pipe(ENV.mode.production(sass(sassConfig.production).on("error", sass.logError)))
                    .pipe(ENV.mode.staging(sass(sassConfig.staging).on("error", sass.logError)))
                    .pipe(postcss(scssPlugins))
                    .pipe(gulp.dest(config.styles.files[key]));
            }

            mergedStreams.add(stream);
        }

        return mergedStreams.isEmpty() ? null : mergedStreams;
    };
};
