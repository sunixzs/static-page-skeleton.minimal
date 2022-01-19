"use strict";

/**
 * Task to render html out of nunjucks files.
 */
module.exports = (gulp, plugins, ENV, config) => {
    return () => {
        return (
            gulp
                // get the sources
                .src(config.nunjucks.sourcePattern)

                // add data file
                .pipe(
                    plugins.data(function() {
                        return require("../" + ENV.dataFile);
                    })
                )

                // Render template with nunjucks
                .pipe(
                    plugins.nunjucksRender({
                        path: [config.nunjucks.templatePath]
                    })
                )

                // compress output
                .pipe(plugins.cleanhtml())

                // output files in app folder
                .pipe(gulp.dest(ENV.targetFolder))
        );
    };
};
