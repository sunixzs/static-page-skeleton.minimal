"use strict";

// stuff for ts
// const ts = require("gulp-typescript");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
// const watchify = require("watchify");
const tsify = require("tsify");
const uglify = require("gulp-uglify");
// const fancy_log = require("fancy-log");
const sourcemaps = require("gulp-sourcemaps");
const buffer = require("vinyl-buffer");
const babel = require("gulp-babel");

/**
 * Task to minify/uglify js files.
 */
module.exports = (gulp, plugins, ENV, config) => {
    return () => {
        var mergedStreams = require("merge-stream")();

        for (var key in config.ts.files) {
            // create target filename
            let pathParts = key.split("/");
            let targetFilename = pathParts[pathParts.length - 1].replace(".ts", ".js");

            // inform the user
            console.log(
                plugins.color("ts -> bundle -> uglify: ", "BLUE") + plugins.color(key, "CYAN")
            );
            console.log(
                plugins.color("                    to: ", "BLUE") +
                    plugins.color(config.ts.files[key] + targetFilename, "CYAN")
            );

            if (ENV.sourcemaps) {
                var stream = browserify()
                    .add(key)
                    .plugin(tsify)
                    .bundle()
                    .on("error", function (error) {
                        console.error(error.toString());
                    })
                    .pipe(source(targetFilename))
                    .pipe(buffer())
                    .pipe(sourcemaps.init())
                    .pipe(babel(config.babel))
                    .pipe(ENV.mode.production(plugins.uglify()))
                    .pipe(ENV.mode.staging(plugins.uglify()))
                    .pipe(sourcemaps.write("./"))
                    .pipe(gulp.dest(config.ts.files[key]));
            } else {
                var stream = browserify()
                    .add(key)
                    .plugin(tsify)
                    .bundle()
                    .on("error", function (error) {
                        console.error(error.toString());
                    })
                    .pipe(source(targetFilename))
                    .pipe(buffer())
                    .pipe(babel(config.babel))
                    .pipe(ENV.mode.production(plugins.uglify()))
                    .pipe(ENV.mode.staging(plugins.uglify()))
                    .pipe(gulp.dest(config.ts.files[key]));
            }

            mergedStreams.add(stream);
        }

        return mergedStreams.isEmpty() ? null : mergedStreams;
    };
};
