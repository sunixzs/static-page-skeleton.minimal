"use strict";

/**
 * Call the methods in command line either with --production, --development or --staging parameter.
 * Default value is development.
 * Example: gulp scss --production
 */

const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();

// set environment
let ENV = {
    mode: require("gulp-mode")({
        modes: ["development", "staging", "production"]
    }),
    context: "development",
    targetFolder: "./development/",
    dataFile: "../data_development.json"
};

if (ENV.mode.production()) {
    ENV.context = "production";
    ENV.targetFolder = "./production/";
    ENV.dataFile = "../data_production.json";
} else if (ENV.mode.staging()) {
    ENV.context = "staging";
    ENV.targetFolder = "./staging/";
    ENV.dataFile = "../data_staging.json";
}

// print environment message
console.log(
    plugins.color("=== Set context to ", "BLUE") +
        plugins.color(ENV.context, "CYAN") +
        plugins.color(" with target folder ", "BLUE") +
        plugins.color(ENV.targetFolder, "CYAN") +
        plugins.color(" using data in ", "BLUE") +
        plugins.color(ENV.dataFile, "CYAN") +
        plugins.color(" ===", "BLUE")
);

// load configuration for tasks
const config = require("./config")(ENV.targetFolder);

/**
 * Method to load a task dynamically.
 * @param {string} task
 */
let getTask = task => {
    return require("./gulp-tasks/" + task)(gulp, plugins, ENV, config);
};

// define scss tasks
gulp.task("scss", getTask("scss"));
gulp.task("scss:watch", () => {
    return gulp.watch(config.styles.watchSource, gulp.series("scss"));
});

// define js single tasks
gulp.task("js", getTask("js"));
gulp.task("js:watch", () => {
    return gulp.watch(config.js.filesWatchSource, gulp.series("js"));
});

// define typescript tasks
gulp.task("ts", getTask("typescript"));
gulp.task("ts:watch", function () {
    return gulp.watch([config.ts.watchSource], gulp.series("ts"));
});

// define nunjucks tasks
gulp.task("nunjucks", getTask("nunjucks"));
gulp.task("nunjucks:watch", () => {
    return gulp.watch(config.nunjucks.filesWatchSource, gulp.series("nunjucks"));
});

// define assets tasks
gulp.task("assets:cleanup", getTask("assets_cleanup"));
gulp.task("assets:build", getTask("assets_build"));
gulp.task("assets", gulp.series("assets:cleanup", "assets:build"));
gulp.task("cleanup", getTask("cleanup"));

// task to build all in once
gulp.task("build", gulp.series("assets:cleanup", "cleanup", "nunjucks", "assets:build", "scss", "js", "ts"));


// prettier-ignore
gulp.task("default", (cb) => {
    console.log("Available tasks:");
    console.log(plugins.color("gulp scss           ", "CYAN") + "builds css from scss");
    console.log(plugins.color("gulp scss:watch     ", "CYAN") + "");
    console.log(plugins.color("gulp ts             ", "CYAN") + "bundles and uglifies typescript");
    console.log(plugins.color("gulp ts:watch       ", "CYAN") + "");
    console.log(plugins.color("gulp js             ", "CYAN") + "uglifies js");
    console.log(plugins.color("gulp js:watch       ", "CYAN") + "");
    console.log(plugins.color("gulp cleanup        ", "CYAN") + "removes some build folders/files");
    console.log(plugins.color("gulp assets:cleanup ", "CYAN") + "removes some folders/files in assets folder");
    console.log(plugins.color("gulp assets:build   ", "CYAN") + "copies some folders/files to assets folder");
    console.log(plugins.color("gulp assets         ", "CYAN") + "Does assets:cleanup and the assets:build");
    console.log(plugins.color("gulp build          ", "CYAN") + "to do the stuff above: cleanup, assets, scss, js, js_merge");
    console.log("");
    console.log("... call them either with:");
    console.log(plugins.color("--production", "CYAN"));
    console.log(plugins.color("--staging", "CYAN"));
    console.log(plugins.color("--development", "CYAN") + " (default)");
    console.log("");

    return cb();
});