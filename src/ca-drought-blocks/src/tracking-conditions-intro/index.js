import { registerBlockType } from "@wordpress/blocks";
import { 
  useBlockProps, 
  useInnerBlocksProps, 
  InnerBlocks, 
  InspectorControls 
} from "@wordpress/block-editor";
import { GridSpanSettings } from "../base/grid-span";
import "./style.scss";
import "./editor.scss";

const edit = (props) => {
  const { gridSpan } = props.attributes;

  const blockProps = useBlockProps({
    className: `tracking-conditions-intro ${gridSpan}`,
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      template: [
        ["core/heading", { level: 3, placeholder: "Subsection intro heading..." }],
        ["core/paragraph", { placeholder: "Subsection intro description..." }],
      ],
      templateLock: false,
    }
  );

  return (
    <>
      <InspectorControls>
        { <GridSpanSettings {...props}/> }
      </InspectorControls>
      <div {...innerBlocksProps}></div>
    </>
  );
}


const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/tracking-conditions-intro", {
  edit,
  save,
});
