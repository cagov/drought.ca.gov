import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = () => {
  const blockProps = useBlockProps({
    className: "home-grid",
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      orientation: "horizontal"
    }
  );

  return (
    <div {...innerBlocksProps}></div>
  );
};

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/home-grid", {
  edit,
  save,
});
