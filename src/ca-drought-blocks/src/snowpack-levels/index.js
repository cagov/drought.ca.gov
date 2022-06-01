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
    srIntro,
    lede, 
    unit,
    historicPeakLevel,
    currentLevel,
    historicPeakHeading,
    currentHeading
  } = attributes;

  const blockProps = useBlockProps({
    "data-unit": unit,
    "data-historic-peak": historicPeakLevel,
    "data-current": currentLevel
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
          tagName="h5"
          slot="summary-header"
          value={srIntro} 
          onChange={(str) => setAttributes({srIntro: str})}
          placeholder='Heading for current summary...'
        />
        <RichText
          tagName="p"
          className="current-level current-level-flex"
          slot="summary-stat"
          value={lede} 
          onChange={(str) => setAttributes({lede: str})}
          placeholder='Summarize current levels...'
        />
        <RichText
          tagName="h5"
          slot="historic-peak-header"
          value={historicPeakHeading} 
          onChange={(str) => setAttributes({historicPeakHeading: str})}
          placeholder='Heading for historic peak levels...'
        />
        <p slot="historic-peak-stat">{historicPeakLevel} {unit}</p>
        <RichText
          tagName="h5"
          slot="current-header"
          value={currentHeading} 
          onChange={(str) => setAttributes({currentHeading: str})}
          placeholder='Heading for current levels...'
        />
        <p slot="current-stat">{currentLevel} {unit}</p>
      </drought-snowpack-levels>
    </>
  );
};

const save = () => null;

registerBlockType("ca-drought-blocks/snowpack-levels", {
  edit,
  save,
});
