import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from "@wordpress/block-editor";
import { addGridSpans } from "./grid-span.js";
import "./style.scss";
import "./editor.scss";

const edit = () => {
  const blockProps = useBlockProps({
    className: "home-grid",
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      orientation: "horizontal",
      template: [
        ["ca-drought-blocks/div"]
      ],
      allowedBlocks: [
        "core/group",
        "ca-drought-blocks/div",
        "ca-drought-blocks/data-viz",
        "ca-drought-blocks/decorative-image"
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
