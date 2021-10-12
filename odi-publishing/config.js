const main = require('./odi-publishing.json'); // Default settings.
const main_test_pantheon = require('./odi-publishing.main-test-pantheon.json'); // Default settings.
// const staging = require('./odi-publishing.staging.json'); // Default settings.

const getConfig = () => {
    var branch = "main_test_pantheon"; // @TEMP!!
    // @TODO connect .yml or local env variable branch name & return if branch exists. @ISSUE
    
    switch (branch) {
        case 'main': 
            return main;
        case 'main_test_pantheon': 
            return main_test_pantheon;
        // case 'staging': 
        //     return staging;
        default:
            return main;
    }
}

exports.getConfig = getConfig;