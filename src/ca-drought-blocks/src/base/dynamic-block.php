<?php

include_once("block.php");

/**
 * Inherit this class to create dynamic Gutenberg blocks.
 * When saved, dynamic blocks are rendered in PHP.
 * Note that you'll need to supply a unique render function for each block (see below).
 * 
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/
 */
abstract class DynamicBlock extends Block {
  /**
   * Registers this block with metadata from the build's `block.json` file.
   * Then overrides the render_callback with our own dynamic renderer in PHP.
   *
   * @see https://developer.wordpress.org/reference/functions/register_block_type_from_metadata/
   */
  public function register(): void {
    register_block_type_from_metadata( $this->blockBuildPath, [
      'render_callback' => [ $this, 'render' ]
    ]);
  }

  /**
   * Implements the dynamic renderer for this block.
   * Abstract. Must be implemented by each block.
   * 
   * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/
   */
  abstract public function render( $attributes, $content );

  /**
   * Common function to help pull classes out of $attributes supplied to the dynamic renderer.
   */
  public function createClassList( $attributes, ...$classes ): string {
    $className = $attributes['className'] ?? '';
    $wpConfiguredClasses = strlen($className) > 0 ? ' ' . $className : '';
    $classList = join(' ', $classes) . $wpConfiguredClasses;
    return trim($classList);
  }
}

?>