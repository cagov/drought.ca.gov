const branch = require('git-branch');
const main = require('./odi-publishing.json'); // Default settings.
const defaultBranch = require('./odi-publishing.json'); // Default settings.
const main_test_pantheon = require('./odi-publishing.main-test-pantheon.json'); // Default settings.
const staging = require('./odi-publishing.staging.json'); // Default settings.
const development = require('./odi-publishing.development.json'); // Default settings.
const localhost = require('./odi-publishing.localhost.json'); // Default settings.

const getConfig = () => {

    var defaultBranch = "main"; // Default to main branch.

    branch('./odi-publishing')
    .then(name => {
        console.log('Build is on branch:', name);
        switch (branch) {
            case 'localhost': 
                return localhost;
            case 'main': 
                return main;
            case 'main_test_pantheon': 
                return main_test_pantheon;
            case 'staging': 
                return staging;
            case 'development': 
                return development;
            default:
                return defaultBranch;
        }
    })
    .catch(console.error, (error) => console.error(error));
    
    return main; // Return default.
}

exports.getConfig = getConfig;