import { registerBlockType } from "@wordpress/blocks";
import {
	ToggleControl,
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
  const { fullBleed } = attributes;

  const blockProps = useBlockProps({
    className: (fullBleed) ? "full-bleed section-block" : "section-block",
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      template: [
        ["core/heading", { level: 2, placeholder: "Section block heading..." }],
      ],
      templateLock: false,
    }
  );

  const onChangeFullBleed = (bool) => setAttributes({ fullBleed: bool });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Grid settings">
          <ToggleControl
            label="Full bleed"
            help="Enables full-bleed backgrounds that span beyond the page layout's width. If enabled, you'll need to embed a Section Block (Full Bleed) block inside."
            checked={ fullBleed }
            onChange={ onChangeFullBleed }
          />
        </PanelBody>
      </InspectorControls>
      <section {...innerBlocksProps}></section>
    </>
  );
}


const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/section-block", {
  edit,
  save,
});
