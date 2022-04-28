<?php

include_once("block.php");

/**
 * Inherit this class to create static Gutenberg blocks.
 * When saved, static blocks are rendered in Javascript.
 * 
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
abstract class StaticBlock extends Block {
  /**
   * Registers this block with metadata from the build's `block.json` file.
   *
   * @see https://developer.wordpress.org/reference/functions/register_block_type_from_metadata/
   */
  public function register(): void {
    register_block_type_from_metadata( $this->blockBuildPath );
  }
}

?>