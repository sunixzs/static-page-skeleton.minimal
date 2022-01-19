"use strict";

const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

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
            let stream = gulp
                .src(key)
                // initialize sourcemaps
                .pipe(ENV.mode.development(sourcemaps.init()))

                // build scss
                .pipe(
                    ENV.mode.development(
                        plugins
                            .sass({
                                indentType: "space",
                                indentWidth: 4,
                                sourceMap: true,
                                outputStyle: "expanded"
                            })
                            .on("error", sass.logError)
                    )
                )
                .pipe(
                    ENV.mode.production(
                        plugins
                            .sass({
                                sourceMap: false,
                                outputStyle: "compressed"
                            })
                            .on("error", sass.logError)
                    )
                )
                .pipe(
                    ENV.mode.staging(
                        plugins
                            .sass({
                                sourceMap: false,
                                outputStyle: "compressed"
                            })
                            .on("error", sass.logError)
                    )
                )

                // call autoprefixer
                .pipe(postcss(scssPlugins))

                // write sourcemaps
                .pipe(ENV.mode.development(sourcemaps.write("./maps")))

                // write file
                .pipe(gulp.dest(config.styles.files[key]));

            mergedStreams.add(stream);
        }

        return mergedStreams.isEmpty() ? null : mergedStreams;
    };
};
