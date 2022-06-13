<?php

/**
 * Inherit this abstract class to help register and render blocks in WordPress. 
 */
abstract class Block {
  /**
   * This constructor adds the registration hook for this block into WordPress.
   * 
   * @see https://developer.wordpress.org/reference/functions/add_action/
   */
  public function __construct() {
    $this->blockBuildPath = $this->getBlockBuildPath();
    add_action( 'init', [ $this, 'register' ] );
  }

  /**
   * $blockBuildPath is the path to the block's `block.json` file, in the build folder.
   */
  public string $blockBuildPath;

  /**
   * getBlockFilePath() finds the path for $blockBuildPath.
   */
  public function getBlockBuildPath(): string {
    // Get the path of the parent class, which is this PHP file.
    $parentReflector = new ReflectionClass(self::class);
    $parentFilename = $parentReflector->getFileName();
    // We need the full directory path for this file.
    $parentPath = dirname($parentFilename);

    // Get the path of the child class, which is the block.
    $childReflector = new ReflectionClass(static::class);
    $blockFilename = $childReflector->getFileName();
    // We only want the folder name for the block.
    $blockDirname = basename(dirname($blockFilename));

    // Build the path for the `block.json` file that's in the build folder.
    $blockBuildPath = $parentPath . '/../../build/' . $blockDirname;
    return $blockBuildPath;
  }

  /**
   * Registers the block with Wordpress.
   * Abstract. Must be implemented by child classes.
   * See child classes (DynamicBlock and StaticBlock) for more info.
   */
  abstract public function register();
}

?>