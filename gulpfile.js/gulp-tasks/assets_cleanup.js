"use strict";

const glob = require("glob");
const del = require("del");

/**
 * Task to remove assets which are copied with 'assets_build'.
 */
module.exports = (gulp, plugins, ENV, config) => {
    return cb => {
        let totalPromise = null;

        config.assets.forEach((settings, index) => {
            if (settings.cleanupPattern) {
                var filesToRemove = glob.sync(settings.cleanupPattern);
                if (filesToRemove.length) {
                    console.log(
                        plugins.color("Assets: Remove ", "BLUE") +
                            plugins.color(filesToRemove.length, "CYAN") +
                            plugins.color(" files with pattern ", "BLUE") +
                            plugins.color(settings.cleanupPattern, "CYAN")
                    );

                    let promise = Promise.resolve(del(settings.cleanupPattern));
                    if (promise) {
                        totalPromise = promise;
                    }
                } else {
                    console.log(plugins.color("Assets: Nothing to remove with pattern ", "BLUE") + plugins.color(settings.cleanupPattern, "CYAN"));
                }
            } else {
                console.log(plugins.color("Assets: Nothing to remove for", "BLUE") + plugins.color(" settings.assets[" + index + "]", "CYAN") + plugins.color(".", "BLUE"));
            }
        });

        return totalPromise ? totalPromise : cb();
    };
};
