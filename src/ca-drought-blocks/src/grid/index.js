import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from "@wordpress/block-editor";
import { addGridSpans } from "./grid-span.js";
import "./style.scss";
import "./editor.scss";

const edit = () => {
  const blockProps = useBlockProps({
    className: "grid",
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      orientation: "horizontal",
      template: [
        ["core/group"]
      ],
      allowedBlocks: [
        "core/group",
        "ca-drought-blocks/data-viz"
      ]
    }
  );

  return (
    <div {...innerBlocksProps}></div>
  );
};

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/grid", {
  edit,
  save,
});

addGridSpans();
