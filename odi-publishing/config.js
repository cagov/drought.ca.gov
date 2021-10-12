const main = require('./odi-publishing.json'); // Default settings.
const main_test_pantheon = require('./odi-publishing.main-test-pantheon.json'); // Default settings.

const getConfig = () => {
    var branch = "main_test_pantheon"; // @TEMP
    // @TODO connect .yml or local env variable branch name & return if branch exists.
    
    switch (branch) {
        case 'main': 
            return main;
        default:
            return main;
    }
}

exports.getConfig = getConfig;