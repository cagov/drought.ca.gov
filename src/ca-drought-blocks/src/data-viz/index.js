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
    className: `data-viz ${gridSpan}`,
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      template: [
        ["core/heading", { level: 4, placeholder: "Data visual heading..." }],
        ["ca-drought-blocks/data-viz-desc"],
        ["ca-drought-blocks/data-viz-placement"],
        ["ca-drought-blocks/data-viz-footer"]
      ],
      templateLock: "all",
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

registerBlockType("ca-drought-blocks/data-viz", {
  edit,
  save,
});
