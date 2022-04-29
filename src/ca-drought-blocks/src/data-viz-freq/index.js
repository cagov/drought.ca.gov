import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = () => {
  const blockProps = useBlockProps({
    className: "data-viz-freq",
  });
  return (
    <div {...blockProps}>
      <InnerBlocks
        template={[
          ["core/paragraph", { placeholder: "Describe update frequency..." }],
        ]}
        templateLock={false}
        allowedBlocks={["core/paragraph"]}
      />
    </div>
  );
}

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/data-viz-freq", {
  edit,
  save,
});
