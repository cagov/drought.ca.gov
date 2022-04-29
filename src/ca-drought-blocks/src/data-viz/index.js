import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = (props) => {
  // const { attributes, setAttributes } = props;
  const blockProps = useBlockProps({
    className: "data-viz",
  });
  // const onChangeHeading = (heading) => setAttributes({ heading });
  return (
    <div {...blockProps}>
      <InnerBlocks
        template={[
          ["core/heading", { level: 3, placeholder: "Data visual heading..." }],
          ["ca-drought-blocks/data-viz-desc"],
          ["core/html"],
          ["ca-drought-blocks/data-viz-footer"]
        ]}
        templateLock="all"
      />
    </div>
  );
}


const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/data-viz", {
  edit,
  save,
});
