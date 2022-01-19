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
        assets: [
            {
                cleanupPattern: targetFolder + "assets/fonts/**",
                sourcePattern: "./assets/fonts/*",
                targetBaseDirectory: targetFolder
            },
            {
                cleanupPattern: targetFolder + "assets/images/**",
                sourcePattern: "./assets/images/**/*[.xml|.png|.svg|.jpg|.webmanifest|.ico]",
                targetBaseDirectory: targetFolder
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
