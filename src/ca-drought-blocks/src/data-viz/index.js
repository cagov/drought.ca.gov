import { registerBlockType } from "@wordpress/blocks";
import {
	CheckboxControl,
	RadioControl,
	TextControl,
	ToggleControl,
	SelectControl,
	PanelBody,
} from '@wordpress/components';
import { 
  useBlockProps, 
  useInnerBlocksProps, 
  InnerBlocks, 
  InspectorControls 
} from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = (props) => {
  const { attributes, setAttributes } = props;
  const { gridSpan } = attributes;

  const blockProps = useBlockProps({
    className: `data-viz ${gridSpan}`,
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      template: [
        ["core/heading", { level: 4, placeholder: "Data visual heading..." }],
        ["ca-drought-blocks/data-viz-desc"],
        ["ca-drought-blocks/data-viz-placement"],
        ["ca-drought-blocks/data-viz-footer"]
      ],
      templateLock: "all",
    }
  );

  const onChangeGridSpan = (str) => setAttributes({ gridSpan: str });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Grid settings">
          <RadioControl
            label="Grid span"
            help="Set how many cells this element will occupy in the layout's hidden three-column grid."
            selected={ gridSpan }
            options={ [
              { label: 'Span 1', value: 'home-grid-span-1' },
              { label: 'Span 2 Desktop', value: 'home-grid-span-2' },
              { label: 'Span 2 Tablet Only', value: 'home-grid-span-2-md' },
              { label: 'Span 3 Desktop', value: 'home-grid-span-3' },
            ] }
            onChange={ onChangeGridSpan }
          />
        </PanelBody>
      </InspectorControls>
      <div {...innerBlocksProps}></div>
    </>
  );
}


const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/data-viz", {
  edit,
  save,
});
