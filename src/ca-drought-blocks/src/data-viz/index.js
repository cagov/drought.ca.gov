import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = (props) => {
  // const { attributes, setAttributes } = props;
  const blockProps = useBlockProps({
    className: "data-viz",
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

  // const onChangeHeading = (heading) => setAttributes({ heading });
  return (
    <div {...innerBlocksProps}></div>
  );
}


const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/data-viz", {
  edit,
  save,
});
