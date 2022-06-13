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
    capacityTaf,
    historicalTaf,
    currentTaf,
    capacityHeading,
    historicalHeading,
    currentHeading
  } = attributes;

  const blockProps = useBlockProps({
    "data-unit": unit,
    "data-capacity-taf": capacityTaf,
    "data-historical-taf": historicalTaf,
    "data-current-taf": currentTaf,
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
            label={capacityHeading}
            value={capacityTaf}
            onChange={(str) => setAttributes({capacityTaf: str})}
          />
          <TextControl
            label={historicalHeading}
            value={historicalTaf}
            onChange={(str) => setAttributes({historicalTaf: str})}
          />
          <TextControl
            label={currentHeading}
            value={currentTaf}
            onChange={(str) => setAttributes({currentTaf: str})}
          />
        </PanelBody>
      </InspectorControls>
      <drought-reservoir-levels {...blockProps}>
        <RichText
          tagName="h5"
          slot="summary-header"
          value={srIntro}
          onChange={(str) => setAttributes({srIntro: str})}
          placeholder='Heading for current summary...'
        />
        <RichText
          tagName="p"
          className="current-level"
          slot="summary-stat"
          value={lede}
          onChange={(str) => setAttributes({lede: str})}
          placeholder='Summarize current levels...'
        />
        <RichText
          tagName="h5"
          slot="capacity-header"
          value={capacityHeading} 
          onChange={(str) => setAttributes({capacityHeading: str})}
          placeholder='Heading for total capacity...'
        />
        <p slot="capacity-stat">{capacityTaf} {unit}</p>
        <RichText
          tagName="h5"
          slot="historical-header"
          value={historicalHeading} 
          onChange={(str) => setAttributes({historicalHeading: str})}
          placeholder='Heading for historical average...'
        />
        <p slot="historical-stat">{historicalTaf} {unit}</p>
        <RichText
          tagName="h5"
          slot="current-header"
          value={currentHeading} 
          onChange={(str) => setAttributes({currentHeading: str})}
          placeholder='Heading for current level...'
        />
        <p slot="current-stat">{currentTaf} {unit}</p>
      </drought-reservoir-levels>
    </>
  );
};

const save = () => null;

registerBlockType("ca-drought-blocks/reservoir-levels", {
  edit,
  save,
});
