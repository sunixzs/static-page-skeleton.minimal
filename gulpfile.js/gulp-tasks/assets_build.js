"use strict";

const glob = require("glob");

/**
 * Task to copy assets into the document root.
 */
module.exports = (gulp, plugins, ENV, config) => {
    return () => {
        let mergedStreams = require("merge-stream")();

        config.assets.forEach(settings => {
            if (settings.source && settings.targetDirectory) {
                console.log(
                    plugins.color("Assets: Copy ", "BLUE") +
                    plugins.color(settings.source, "CYAN") +
                    plugins.color(" to folder: ", "BLUE") +
                    plugins.color(settings.targetDirectory, "CYAN")
                );

                var stream = gulp.src(settings.source).pipe(gulp.dest(settings.targetDirectory));
                mergedStreams.add(stream);
            } else {
                let filesToCopy = glob.sync(settings.sourcePattern);

                if (filesToCopy.length) {
                    console.log(
                        plugins.color("Assets: Copy ", "BLUE") +
                        plugins.color(filesToCopy.length, "CYAN") +
                        plugins.color(" files with pattern ", "BLUE") +
                        plugins.color(settings.sourcePattern, "CYAN") +
                        plugins.color(" to folder: ", "BLUE") +
                        plugins.color(settings.targetBaseDirectory, "CYAN")
                    );

                    let stream = gulp.src(filesToCopy, { base: "./" }).pipe(gulp.dest(settings.targetBaseDirectory));
                    mergedStreams.add(stream);
                } else {
                    console.log(plugins.color("Assets: Nothing to copy with pattern: ", "BLUE") + plugins.color(settings.sourcePattern, "CYAN"));
                }
            }
        });

        return mergedStreams.isEmpty() ? null : mergedStreams;
    };
};
