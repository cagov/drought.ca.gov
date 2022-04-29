import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const edit = () => {
  const blockProps = useBlockProps({
    className: "data-viz-desc",
  });
  return (
    <div {...blockProps}>
      <InnerBlocks
        template={[
          ["core/paragraph", { placeholder: "Data visual description..." }],
        ]}
        templateLock={false}
        allowedBlocks={["core/paragraph"]}
      />
    </div>
  );
};

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/data-viz-desc", {
  edit,
  save,
});
