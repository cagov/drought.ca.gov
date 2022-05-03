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

include 'src/data-viz/index.php';
include 'src/data-viz-desc/index.php';
include 'src/data-viz-placement/index.php';
include 'src/data-viz-footer/index.php';
include 'src/data-viz-freq/index.php';

include 'src/heading-with-more/index.php';