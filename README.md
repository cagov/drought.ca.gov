# drought.ca.gov

California state site for drought-related information.

Content -> Production flow

- This site is authored in WordPess
- Content changes are written to this repository in the wordpress directory
- Any change to main branch triggers a git action workflow
- The git action kick soff an 11ty static site build process
- Static site files are created in docs
- Content of docs is uploaded to S3 staging and S3 production sites
- Cloudfront attached to each of these S3 buckets receives a cache invalidation command
- docs is also written to another branch deploy_production which github pages uses a source


## Developer quick start
1. Checkout this repo
2. Run `npm install`
3. Recommended node version: `14.17.3`, npm version `7.6.3`.
4. To run in developer mode `npm run dev`
5. Should run at `http://localhost:8080`.

## Where CSS lives

* CSS variables live in `src/css/sass/colorschemes/_drought.scss`.

## Wordpress template defaults

Default values for Wordpress content templates are configured in `src/templates/wordpress/wordpress.11tydata.js`.

## Network diagram

<img src="drought.ca.gov-web-application-architecture.png">

## Drought map

For more information regarding how we generate our drought maps, see our [drought map technical notes](src/py/generate-drought-map/readme.md).

## Deployment Repositoy

Deployment is handled by a [wordpress-to-github](https://www.npmjs.com/package/@cagov/wordpress-to-github) instance; the repository that controls it is [here](https://github.com/cagov/services-wordpress-to-github-drought-ca-gov).
