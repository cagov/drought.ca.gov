<?php
/**
 * Plugin Name:       Drought Blocks
 * Description:       Gutenberg blocks for drought.ca.gov's Wordpress site.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Jon Jensen
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       ca-drought-blocks
 *
 * @package           ca-drought-blocks
 */

function register_drought_block_categories( $categories ) {
  return array_merge($categories, [
    [
      'slug' => 'ca-drought-blocks',
      'title' => 'drought.ca.gov'
    ]
  ]);
} 

add_action( 'block_categories_all', 'register_drought_block_categories', 10, 2 );

include 'src/example-dynamic-block/index.php';
include 'src/example-static-block/index.php';

include 'src/simple-image/index.php';

include 'src/data-viz-pct/index.php';
include 'src/data-viz/index.php';
include 'src/reservoir-levels/index.php';
include 'src/snowpack-levels/index.php';
include 'src/spei-map/index.php';

include 'src/heading-with-more/index.php';
include 'src/section-block/index.php';
include 'src/tracking-conditions-intro/index.php';

include 'src/home-grid/index.php';
include 'src/home-grid-item/index.php';

include 'src/highlight-box-figure/index.php';
include 'src/highlight-box/index.php';
include 'src/highlight-box-item/index.php';