import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = (props) => {
  const blockProps = useBlockProps({
    className: "full-bleed-content-area",
  });

  const innerBlocksProps = useInnerBlocksProps(blockProps);

  return (
    <div {...innerBlocksProps}></div>
  );
}


const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/section-block-full-bleed", {
  edit,
  save,
});
