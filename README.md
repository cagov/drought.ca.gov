# drought.ca.gov

California state site for drought related information

Content -> Production flow

- This site is authored in WordPess
- Content changes are written to this repository in the wordpress directory
- Any change to main branch triggers a git action workflow
- The git action kick soff an 11ty static site build process
- Static site files are created in docs
- Content of docs is uploaded to S3 staging and S3 production sites
- Cloudfront attached to each of these S3 buckets receives a cache invalidation command
- docs is also written to another branch deploy_production which github pages uses a source


