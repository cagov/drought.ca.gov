import { registerBlockType } from "@wordpress/blocks";
import { 
  useBlockProps, 
  useInnerBlocksProps, 
  InnerBlocks
} from "@wordpress/block-editor";
import { addFigureFormat } from "./highlight-box-figure.js";
import "./style.scss";
import "./editor.scss";

const edit = () => {
  const blockProps = useBlockProps({
    className: "highlight-box-item",
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      template: [
        ["ca-drought-blocks/decorative-image", {lock: {remove: true}}],
        ["ca-drought-blocks/div", {className: "highlight-box-item-content", lock: {remove: true}}, [
          ["core/paragraph", { placeholder: "Information to highlight..." }]
        ]]
      ],
      templateLock: false,
    }
  );

  return (
    <div {...innerBlocksProps}></div>
  );
};

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/highlight-box-item", {
  edit,
  save,
});

addFigureFormat();
