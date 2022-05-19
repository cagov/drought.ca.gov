import { registerBlockType } from "@wordpress/blocks";
import { withSelect } from "@wordpress/data";
import { Button } from '@wordpress/components';
import { 
  useBlockProps, 
  useInnerBlocksProps, 
  InnerBlocks,
  MediaUpload,
  MediaUploadCheck
} from "@wordpress/block-editor";
import "./style.scss";
import "./editor.scss";

const HighlightBoxItemEdit = (props) => {
  const { attributes, media, setAttributes } = props;
  const { 
    imgId,
    imgUrl,
    imgAlt
  } = attributes;

  const blockProps = useBlockProps({
    className: "highlight-box-item",
  });

  const innerBlocksProps = useInnerBlocksProps(
    {},
    {
      template: [
        ["core/paragraph", { placeholder: "Information to highlight...", className: "test" }],
      ],
      templateLock: false,
    }
  );

  const deleteImg = () => setAttributes({ imgId: 0, imgUrl: "", imgAlt: "" });

  const selectImg = (media) => setAttributes({
    imgId: media.id,
    imgUrl: media.url,
    imgAlt: media.alt_text
  });

  const renderRemovalCheck = () => {
    if (media) {
      return (
        <MediaUploadCheck>
          <Button
            onClick={deleteImg}
            className="highlight-box-item-image-removal"
            isLink
            isDestructive
          >
            Remove<br/>image
          </Button>
        </MediaUploadCheck>
      );
    } else {
      return (<></>);
    }
  }

  const renderButtonContents = () => {
    if (media !== undefined) {
      return (
          <img src={media.source_url} alt={media.alt_text} />
      );
    } else {
      return "Select an image";
    }
  }

  const renderImgButton = ({open}) => (
    <Button
      onClick={open}
      className={!media ? "editor-post-featured-image__toggle" : ""}
    >
      {renderButtonContents()}
    </Button>
  )

  return (
    <div {...blockProps}>
      <div className="highlight-box-item-image-selection">
        <MediaUploadCheck>
          <MediaUpload 
            onSelect={selectImg}
            value={imgId}
            allowedTypes={["image"]}
            render={renderImgButton}
          />
        </MediaUploadCheck>
        {renderRemovalCheck()}
      </div>
      <div {...innerBlocksProps}></div>
    </div>
  );
};

const edit = withSelect((select, props) => {
  const media = props.attributes.imgId
    ? select("core").getMedia(props.attributes.imgId)
    : undefined;

  return { media };
})(HighlightBoxItemEdit);

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/highlight-box-item", {
  edit,
  save,
});
