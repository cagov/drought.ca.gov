import { registerBlockType } from "@wordpress/blocks";
import {
	TextControl,
	PanelBody
} from '@wordpress/components';
import { 
  useBlockProps, 
  RichText,
  InspectorControls
} from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = (props) => {
  const { attributes, setAttributes } = props;
  const { 
    lede, 
    unit,
    caption,
    historicPeakLevel,
    currentLevel,
    historicPeakHeading,
    currentHeading
  } = attributes;

  const blockProps = useBlockProps({
    "data-unit": unit
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Reservoir data">
          <TextControl
            label="Measurement unit"
            value={unit}
            onChange={(str) => setAttributes({unit: str})}
          />
          <TextControl
            label={historicPeakHeading}
            value={historicPeakLevel}
            onChange={(str) => setAttributes({historicPeakLevel: str})}
          />
          <TextControl
            label={currentHeading}
            value={currentLevel}
            onChange={(str) => setAttributes({currentLevel: str})}
          />
        </PanelBody>
      </InspectorControls>
      <drought-snowpack-levels {...blockProps}>
        <RichText
          tagName="p"
          className="current-level current-level-flex"
          slot="current-level"
          value={lede} 
          onChange={(str) => setAttributes({lede: str})}
          placeholder='Summarize current levels...'
        />
        <table slot="table-data" id="snowpack-data-table">
          <RichText
            tagName="caption"
            value={caption} 
            onChange={(str) => setAttributes({caption: str})}
            placeholder='Provide an alt description...'
          />
          <thead>
            <tr>
              <RichText
                tagName="th"
                id="snowpack-historic-header"
                value={historicPeakHeading} 
                onChange={(str) => setAttributes({historicPeakHeading: str})}
                placeholder='Heading for historical average...'
              />
              <RichText
                tagName="th"
                id="snowpack-current-header"
                value={currentHeading} 
                onChange={(str) => setAttributes({currentHeading: str})}
                placeholder='Heading for current level...'
              />
            </tr>
          </thead>
          <tbody>
            <tr 
              id="snowpack-data" 
              data-current={currentLevel} 
              data-historic-peak={historicPeakLevel}
            >
              <td className="snowpack-historic">{historicPeakLevel} {unit}</td>
              <td className="snowpack-current">{currentLevel} {unit}</td>
            </tr> 
          </tbody>
        </table>
      </drought-snowpack-levels>
    </>
  );
};

const save = () => null;

registerBlockType("ca-drought-blocks/snowpack-levels", {
  edit,
  save,
});
