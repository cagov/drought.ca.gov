import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InnerBlocks } from "@wordpress/block-editor";
import "./editor.scss";

export default function edit(props) {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps({
    className: "data-viz",
  });
  const onChangeHeading = (heading) => setAttributes({ heading });
  return (
    <div {...blockProps}>
      <RichText
        tagName="h3"
        value={attributes.heading}
        onChange={onChangeHeading}
        allowedFormats={[]}
      />
      <div className="data-viz-desc">
        <InnerBlocks
          template={[
            ["core/paragraph", { placeholder: "1P" }],
            ["core/paragraph", { placeholder: "2P" }],
          ]}
          templateLock="all"
          //allowedBlocks={["core/paragraph"]}
        />
      </div>
    </div>
  );
}
