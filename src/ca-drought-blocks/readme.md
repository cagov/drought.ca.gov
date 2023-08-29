# California Drought Blocks

This is a collection of Gutenberg blocks for use in drought.ca.gov's instance of Wordpress, to assist with the editorial process.

## Get started

You'll first need to point your terminal to this directory and install Javascript dependencies.

```sh
cd src/ca-drought-blocks
npm install
```

Your next task will be building the blocks. 

```sh
npm run build
```

You'll see a `build` folder appear with the corresponding code. Wordpress needs this build folder to see the Javascript.

For a quick and dirty test setup, you can now create a Wordpress test site by running the following command. Note that you'll need Docker installed for this to work.

```sh
npm run env:start
```

You'll get an address to a Wordpress development site (probably http://localhost:8888/). Go there, then append `/wp-admin/` to the URL. Login with `admin/password`.

Check to ensure the Drought Blocks plugin is installed in Wordpress. If so, we're ready for development!

## Additional scripts

The following script sets up a watch process for rebuilding the blocks.

```sh
npm run start
```

This one stops the Wordpress test site.

```sh
npm run env:stop
```

If needed, you can create a ZIP file for the whole plugin.

```sh
npm run plugin-zip
```

