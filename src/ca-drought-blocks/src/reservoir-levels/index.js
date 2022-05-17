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
    capacityTaf,
    historicalTaf,
    currentTaf,
    capacityHeading,
    historicalHeading,
    currentHeading
  } = attributes;

  const blockProps = useBlockProps({
    className: "test",
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
            label="Total reservoir capacity"
            value={capacityTaf}
            onChange={(str) => setAttributes({capacityTaf: str})}
          />
          <TextControl
            label="Historical average reservoir level"
            value={historicalTaf}
            onChange={(str) => setAttributes({historicalTaf: str})}
          />
          <TextControl
            label="Current reservoir level"
            value={currentTaf}
            onChange={(str) => setAttributes({currentTaf: str})}
          />
        </PanelBody>
      </InspectorControls>
      <drought-reservoir-levels {...blockProps}>
        <RichText
          tagName="p"
          className="current-level"
          slot="current-level"
          value={lede} 
          allowedFormats={["ca-drought-blocks/data-viz-pct"]}
          onChange={(str) => setAttributes({lede: str})}
          placeholder='Summarize current levels...'
        />
        <table slot="table-data" id="reservoir-data-table">
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
                id="capacity-taf-heading"
                value={capacityHeading} 
                onChange={(str) => setAttributes({capacityHeading: str})}
                placeholder='Heading for total capacity...'
              />
              <RichText
                tagName="th"
                id="historical-taf-heading"
                value={historicalHeading} 
                onChange={(str) => setAttributes({historicalHeading: str})}
                placeholder='Heading for historical average...'
              />
              <RichText
                tagName="th"
                id="current-taf-heading"
                value={currentHeading} 
                onChange={(str) => setAttributes({currentHeading: str})}
                placeholder='Heading for current level...'
              />
            </tr>
          </thead>
          <tbody>
            <tr id="reservoir-data">
              <td className="reservoir-capacity">{capacityTaf} {unit}</td>
              <td className="reservoir-historic">{historicalTaf} {unit}</td>
              <td className="reservoir-current">{currentTaf} {unit}</td>
            </tr> 
          </tbody>
        </table>
      </drought-reservoir-levels>
    </>
  );
};

const save = () => null;

registerBlockType("ca-drought-blocks/reservoir-levels", {
  edit,
  save,
});
