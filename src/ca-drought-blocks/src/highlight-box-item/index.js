import { registerBlockType } from "@wordpress/blocks";
import { 
  useBlockProps, 
  useInnerBlocksProps, 
  InnerBlocks
} from "@wordpress/block-editor";
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
        ["ca-drought-blocks/simple-image", {lock: {remove: true}}],
        ["core/group", {lock: {remove: true}}, [
          ["core/paragraph", { placeholder: "Information to highlight...", className: "test" }]
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
