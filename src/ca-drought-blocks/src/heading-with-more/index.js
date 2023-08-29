import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = (props) => {
  // const { attributes, setAttributes } = props;
  const blockProps = useBlockProps({
    className: "heading-with-more",
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      template: [
        ["core/heading", { level: 2, placeholder: "Data visual heading..." }],
        ["core/paragraph", { placeholder: "More info..." }],
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

registerBlockType("ca-drought-blocks/heading-with-more", {
  edit,
  save,
});
