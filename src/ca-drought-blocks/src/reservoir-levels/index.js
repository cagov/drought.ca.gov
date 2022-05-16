import { registerBlockType } from "@wordpress/blocks";
import { useSelect } from '@wordpress/data';
import {
	TextControl,
	PanelBody
} from '@wordpress/components';
import { 
  useBlockProps, 
  RichText,
  InspectorControls,
  RichTextToolbarButton
} from "@wordpress/block-editor";
import { 
  registerFormatType,
  toggleFormat
} from '@wordpress/rich-text';
import "./style.scss";
import "./editor.scss";

const DataVizPercentageButton = ({isActive, onChange, value}) => {
  const selectedBlock = useSelect((select) => select('core/block-editor').getSelectedBlock(), []);

  if (selectedBlock && selectedBlock.name !== 'ca-drought-blocks/reservoir-levels') {
    return null;
  }

  return (
    <RichTextToolbarButton
      icon="lightbulb"
      title="Data Viz Percentage"
      onClick={() => {
        onChange(
          toggleFormat(value, { type: 'ca-drought-blocks/data-viz-pct' })
        );
      }}
      isActive={isActive}
    />
  );
};

registerFormatType( "ca-drought-blocks/data-viz-pct", {
  title: 'Data Viz Percentage',
  tagName: "span",
  className: "data-viz-pct",
  edit: DataVizPercentageButton
});

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
        <PanelBody title="Reservoir data labels">
          <TextControl
              label="Unit"
              value={unit}
              onChange={(str) => setAttributes({unit: str})}
          />
        </PanelBody>
        <PanelBody title="Reservoir data">
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
