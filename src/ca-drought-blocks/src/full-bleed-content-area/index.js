import { registerBlockType } from "@wordpress/blocks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { addFilter } from "@wordpress/hooks";
import { useSelect } from '@wordpress/data';
import { 
  useBlockProps, 
  useInnerBlocksProps, 
  InnerBlocks
} from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = (props) => {
  const blockProps = useBlockProps({ 
    className: "full-bleed-content-area", 
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      template: [
        ["core/heading", { level: 2, placeholder: "Section heading..." }],
      ],
      templateLock: false,
    }
  );

  return (
    <div {...innerBlocksProps}></div>
  );
}

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/full-bleed-content-area", {
  edit,
  save,
});

const addParentFullBleedClass = createHigherOrderComponent((BlockListBlock) => (props) => {
  const {
    name,
    clientId,
    attributes
  } = props;
  const { 
    className 
  } = attributes;

  const parentBlock = useSelect((select) => {
    const allParents = select('core/block-editor').getBlockParents(clientId);

    if (allParents.length > 0) {
      const nearestParent = select('core/block-editor').getBlock(allParents.slice(-1)[0]);
      return nearestParent;
    }

    return null;
  }, []);

  console.log(props);
  console.log(parentBlock);
  return <BlockListBlock {...props}/>
});

addFilter(
  "editor.BlockListBlock", 
  "ca-drought-blocks/add-parent-full-bleed-class",
  addParentFullBleedClass
);