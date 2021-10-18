const branch = require('git-branch');
/* Load config files */
const main = require('./odi-publishing.json'); // `main` branch
const defaultBranch = require('./odi-publishing.json'); // Default settings (`main`)
const main_test_pantheon = require('./odi-publishing.main-test-pantheon.json'); // `main-test-pantheon`
const staging = require('./odi-publishing.staging.json'); // Default settings.
const development = require('./odi-publishing.development.json'); // Default settings.
const localhost = require('./odi-publishing.localhost.json'); // Default settings.

/**
 * Site specific configurations. Load the correct config file for the current branch
 * SEE ALSO `.github/workflows/*.yml` for links to AWS buckets
 * SEE ALSO `wordpress/wordpress-to-github.*.json` or `wordpress/config` (future) for content service settings.
 *
 * What belongs in the config file:
 * - Any hard coded strings that need translations
 * - Path settings and override links for 11ty builds
 *
 * Maintenance:
 * - Information from this file needs to be kept in sync with wordpress/general/general.json - which is using WordPress Editor settings to get the site name. This could get out of sync and break site metadata. WARNING: Don't change the general.json path. It is overwritten by wordpress-to-github with date stamps of when the build ran last, which is injected into all wordpress/pages, posts and media files.
 * @TODO integration with feature branches (proposed)
 * 
 * @returns Object of site specific configurations.
 */

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
            case 'main-test-pantheon': // Note the dashes.
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