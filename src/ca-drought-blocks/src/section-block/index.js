import { registerBlockType } from "@wordpress/blocks";
import {
	ToggleControl,
  ColorPicker,
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
  const { fullBleed, color } = attributes;

  const parentClass = (fullBleed) 
    ? "full-bleed section-block" 
    : "section-block";

  const blockProps = useBlockProps({ 
    className: parentClass, 
    style: { backgroundColor: color } 
  });

  const innerPropOptions = (fullBleed) 
    ? { className: 'full-bleed-content-area' } 
    : blockProps;

  const innerBlocksProps = useInnerBlocksProps(
    innerPropOptions,
    {
      template: [
        ["core/heading", { level: 2, placeholder: "Section block heading..." }],
      ],
      templateLock: false,
    }
  );

  const onChangeFullBleed = (bool) => setAttributes({ fullBleed: bool });
  const onChangeColor = (str) => setAttributes({ color: str });

  const render = () => {
    if (fullBleed) {
      return (
        <section {...blockProps}>
          <div {...innerBlocksProps}></div>
        </section>
      );
    } else {
      return (
        <section {...innerBlocksProps}></section>
      );
    }
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Background settings">
          <ColorPicker
            color={color}
            onChange={ onChangeColor }
            enableAlpha
          />
          <ToggleControl
            label="Full bleed"
            help="Enables full-bleed backgrounds that span beyond the page layout's width."
            checked={ fullBleed }
            onChange={ onChangeFullBleed }
          />
        </PanelBody>
      </InspectorControls>
      { render() }
    </>
  );
}

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/section-block", {
  edit,
  save,
});
