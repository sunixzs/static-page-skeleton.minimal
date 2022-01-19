"use strict";

/**
 * Configuration of all paths, patterns, etc for the used tasks.
 */
module.exports = targetFolder => {
    return {
        // generate css from scss + autoprefixer
        styles: {
            watchSource: "./assets/scss/**/*.scss",
            files: {
                "./assets/scss/App.scss": targetFolder + "assets/style/",
            }
        },

        js: {
            // minify single js files
            filesWatchSource: "./assets/javascript/**/*.js",
            files: {
                "./assets/javascript/App.js": targetFolder + "assets/javascript/",
                "./vendor/twbs/bootstrap/dist/js/bootstrap.bundle.js": targetFolder + "assets/javascript/",
            }
        },

        ts: {
            // bundle and minify single ts files
            watchSource: "./assets/typescript/**/*.ts",
            files: {
                ["./assets/typescript/App.ts"]: targetFolder + "assets/typescript/",
            },
        },

        // assets to copy
        // To cleanup assets the task is searching for 'cleanupPattern' in this array.
        //
        // There are two ways to copy assets:
        //
        // [1] Copy with glob pattern and keep the file/folder structure
        // The keys 'sourcePattern' and 'targetBaseDirectory' are required.
        // Example:
        // {
        //     sourcePattern: "./assets/images/**/*[.xml|.png|.svg|.jpg|.webmanifest|.ico]",
        //     targetBaseDirectory: targetFolder
        // }
        //
        // [2] Copy single files
        // The keys 'source' and 'targetDirectory' are required.
        // Example:
        // {
        //     source: "./node_modules/jquery/dist/jquery.min.js",
        //     targetDirectory: targetFolder + "assets/javascript/",
        // }
        assets: [
            // {
            //     cleanupPattern: targetFolder + "assets/fonts/**",
            //     sourcePattern: "./assets/fonts/*",
            //     targetBaseDirectory: targetFolder
            // },
            {
                cleanupPattern: targetFolder + "assets/images/**",
                sourcePattern: "./assets/images/**/*[.xml|.png|.svg|.jpg|.webmanifest|.ico]",
                targetBaseDirectory: targetFolder
            },
            {
                source: "./node_modules/jquery/dist/jquery.min.js",
                targetDirectory: targetFolder + "assets/javascript/",
            },
            {
                source: "./node_modules/jquery/dist/jquery.min.map",
                targetDirectory: targetFolder + "assets/javascript/",
            }
        ],

        // other assets which should be 'cleanup'
        cleanup: [
            targetFolder + "assets/style/**", targetFolder + "assets/javascript/**",
            targetFolder + "assets/style/**", targetFolder + "assets/typescript/**"
        ],

        // nunjucks
        nunjucks: {
            filesWatchSource: ["./pages/**/*.+(html|nunjucks|njk)", "./templates/**/*.+(html|nunjucks|njk)"],
            sourcePattern: "./pages/**/*.+(html|nunjucks|njk)",
            templatePath: "./templates"
        },

        // configuration for babel(...)
        babel: {
            presets: [
                [
                    "@babel/env",
                    {
                        modules: false
                    }
                ]
            ]
        }
    };
};
