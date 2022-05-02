import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = () => {
  const blockProps = useBlockProps({
    className: "data-viz-freq",
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      template: [
        ["core/paragraph", { placeholder: "Describe update frequency..." }],
      ],
      templateLock: false,
      allowedBlocks: ["core/paragraph"]
    }
  );
  
  return (
    <div {...innerBlocksProps}></div>
  );
}

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/data-viz-freq", {
  edit,
  save,
});
