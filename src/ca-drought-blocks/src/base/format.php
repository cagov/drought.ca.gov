<?php

/**
 * Inherit this abstract class to help register custom RichText formats in WordPress. 
 */
abstract class Format {
  /**
   * This constructor adds the registration hook for this format into WordPress.
   * 
   * @see https://developer.wordpress.org/reference/functions/add_action/
   */
  public function __construct() {
    $this->formatBuildPath = $this->getFormatBuildPath();
    $this->formatUrlPath = $this->getFormatUrlPath();
    $this->assetFile = $this->getAssetFile();
    add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue' ] );
  }

  /**
   * $formatBuildPath is the system path to the format's build folder.
   */
  public string $formatBuildPath;

  /**
   * getBlockFilePath() finds the system path for $formatBuildPath.
   */
  public function getFormatBuildPath(): string {
    // Get the path of the parent class, which is this PHP file.
    $parentReflector = new ReflectionClass(self::class);
    $parentFilename = $parentReflector->getFileName();
    // We need the full directory path for this file.
    $parentPath = dirname($parentFilename);

    // Get the path of the child class, which is the block.
    $childReflector = new ReflectionClass(static::class);
    $formatFilename = $childReflector->getFileName();
    // We only want the folder name for the block.
    $formatDirname = basename(dirname($formatFilename));

    // Build the path for the `block.json` file that's in the build folder.
    $formatBuildPath = $parentPath . '/../../build/' . $formatDirname;
    return $formatBuildPath;
  }

  /**
   * $formatUrlPath is the public path to the format's build folder.
   */
  public string $formatUrlPath;

  /**
   * getFormatUrlPath() builds the public path for $formatUrlPath.
   */
  public function getFormatUrlPath(): string {
    // Get the path of the child class, which is the block.
    $childReflector = new ReflectionClass(static::class);
    $formatFilename = $childReflector->getFileName();
    // We only want the folder name for the block.
    $formatDirname = basename(dirname($formatFilename));

    // Build the path for the `block.json` file that's in the build folder.
    $formatUrlPath = 'ca-drought-blocks/build/' . $formatDirname;
    return $formatUrlPath;
  }

  /**
   * $assetFile is the parsed `index.asset.php` file from the build folder.
   */
  public array $assetFile;

  /**
   * getAssetFile() finds and parses the `index.asset.php` file in the build folder.
   */
  public function getAssetFile(): array {
    $assets = include $this->formatBuildPath . '/index.asset.php';
    return $assets;
  }

  /**
   * Registers the format with Wordpress.
   * Abstract. Must be implemented by child classes.
   * See child classes for more info.
   */
  abstract public function enqueue();
}

?>