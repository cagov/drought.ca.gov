import { registerBlockType } from "@wordpress/blocks";
import { withSelect } from "@wordpress/data";
import { Button } from '@wordpress/components';
import { 
  useBlockProps, 
  MediaUpload,
  MediaUploadCheck
} from "@wordpress/block-editor";
import { useEffect } from 'react';
import "./style.scss";
import "./editor.scss";

const HighlightBoxItemEdit = (props) => {
  const { attributes, media, setAttributes, isSelected } = props;
  const { 
    imgId,
    imgUrl,
    imgAlt,
    imgWidth,
    imgHeight
  } = attributes;

  const blockProps = useBlockProps({
    className: "decorative-image"
  });

  const deleteImg = () => setAttributes({ 
    imgId: 0, 
    imgUrl: "", 
    imgAlt: "",
    imgWidth: 0,
    imgHeight: 0
  });

  const selectImg = (media) => setAttributes({
    imgId: media.id,
    imgUrl: media.url,
    imgAlt: media.alt,
    imgWidth: media.width,
    imgHeight: media.height,
  });

  const RemovalCheck = () => {
    if (imgId && isSelected) {
      return (
        <MediaUploadCheck>
          <Button
            onClick={deleteImg}
            className="simple-image-control"
            isLink
            isDestructive
          >
            Remove image
          </Button>
        </MediaUploadCheck>
      );
    } else {
      return (<></>);
    }
  }

  const ReplacementCheck = () => {
    if (imgId && isSelected) {
      const renderImgButton = ({open}) => (
        <Button onClick={open} className="simple-image-control" isLink>
          Replace image
        </Button>
      );

      return (
        <MediaUploadCheck>
          <MediaUpload 
            title="Replace image"
            onSelect={selectImg}
            value={imgId}
            allowedTypes={["image"]}
            render={renderImgButton}
          />
        </MediaUploadCheck>
      );
    } else {
      return (<></>);
    }
  }

  const MediaCheck = () => {
    if (imgId) {
      return (
        <img src={imgUrl} alt={imgAlt} width={imgWidth} height={imgHeight} />
      );
    } else {
      const renderImgButton = ({open}) => (
        <Button onClick={open} className="editor-post-featured-image__toggle">
          Select an image
        </Button>
      );

      return (
        <MediaUploadCheck>
          <MediaUpload 
            onSelect={selectImg}
            value={imgId}
            allowedTypes={["image"]}
            render={renderImgButton}
          />
        </MediaUploadCheck>
      );
    }
  }

  return (
    <div {...blockProps}>
      <MediaCheck/>
      <ReplacementCheck/>
      <RemovalCheck/>
    </div>
  );
};

const edit = withSelect((select, props) => {
  const media = props.attributes.imgId
    ? select("core").getMedia(props.attributes.imgId)
    : undefined;

  return { media };
})(HighlightBoxItemEdit);

const save = () => null;

registerBlockType("ca-drought-blocks/decorative-image", {
  edit,
  save,
});
