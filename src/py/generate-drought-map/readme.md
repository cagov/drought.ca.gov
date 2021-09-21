# Generating the drought map

This `process_usmap.py` script generates a drought map for use on the site. We run this script once per week. For example:

![A map of the United States, illustrating which areas are most affected by current drought conditions](src/assets/img/usdm-assets/20210817_usdm_excerpt.png)

## Testing the script

To test, you'll need to install the following dependencies. This process will differ between Mac, Linux, and Windows, so we'll leave it as an exercise for the reader.

* [Python 3](https://www.python.org/downloads/release/python-397/)
* [ImageMagick](https://imagemagick.org/)
* [PngCrush](https://pmt.sourceforge.io/pngcrush/)

Next, you'll need to install the script's dependencies from the `requirements.txt` file. 

> Depending upon your python installation, you may need to replace `python` with `python3` in the following shell commands.

From the root of the drought.ca.gov repo, run the following.

```sh
python -m pip install -r src/py/generate-drought-map/requirements.txt --user
```

Finally, run the script itself.

```sh
python src/py/generate-drought-map/process_usmap.py
```

This script will generate image files in the `src/assets/img/usdm-assets` folder, as well as a `latestDroughtMap.json` file within the `src/templates/_data` folder.

## GitHub Action

This script is current scheduled to run once per week via GitHub Action. See `.github/workflows/generate-drought-map.yml`.
