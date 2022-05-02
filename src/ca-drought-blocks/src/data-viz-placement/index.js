import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = () => {
  const blockProps = useBlockProps({
    className: "data-viz-placement",
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      template: [
        ["core/html"],
      ],
      templateLock: false,
    }
  );

  return (
    <div {...innerBlocksProps}></div>
  );
};

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/data-viz-placement", {
  edit,
  save,
});
