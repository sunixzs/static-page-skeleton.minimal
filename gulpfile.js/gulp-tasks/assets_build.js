"use strict";

const glob = require("glob");

/**
 * Task to copy assets into the document root.
 */
module.exports = (gulp, plugins, ENV, config) => {
    return () => {
        let mergedStreams = require("merge-stream")();

        config.assets.forEach(settings => {
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
        });

        return mergedStreams.isEmpty() ? null : mergedStreams;
    };
};
