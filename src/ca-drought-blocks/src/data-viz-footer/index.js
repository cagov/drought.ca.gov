import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = () => {
  const blockProps = useBlockProps({
    className: "data-viz-footer",
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      template: [
        ["ca-drought-blocks/data-viz-freq"],
        ["core/paragraph", { placeholder: "Add a link..." }],
      ],
      templateLock: false,
      allowedBlocks: [
        "ca-drought-blocks/data-viz-freq", 
        "core/paragraph"
      ]
    }
  );

  return (
    <div {...innerBlocksProps}></div>
  );
}

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/data-viz-footer", {
  edit,
  save,
});
