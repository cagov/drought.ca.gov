import { registerBlockType } from "@wordpress/blocks";
import { 
  useBlockProps, 
  useInnerBlocksProps, 
  InnerBlocks
} from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = () => {
  const blockProps = useBlockProps();

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      templateLock: false,
    }
  );

  return (
    <div {...innerBlocksProps}></div>
  );
}

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/div", {
  edit,
  save,
});