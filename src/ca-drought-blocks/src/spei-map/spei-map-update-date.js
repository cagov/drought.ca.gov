import { useSelect } from '@wordpress/data';
import { RichTextToolbarButton } from "@wordpress/block-editor";
import { 
  registerFormatType,
  toggleFormat
} from '@wordpress/rich-text';
import "./style.scss";
import "./editor.scss";

const SpeiMapUpdateDateButton = ({isActive, onChange, value}) => {
  // Get the selected Rich Text block in the editor.
  const selectedBlock = useSelect((select) => select('core/block-editor').getSelectedBlock(), []);

  // If we can't find the definition of the selected block, escape.
  if (!selectedBlock) {
    return null;
  }

  return (
    <RichTextToolbarButton
      icon="lightbulb"
      title="SPEI Map Update Date"
      onClick={() => onChange(toggleFormat(value, { type: "ca-drought-blocks/spei-map-update-date" }))}
      isActive={isActive}
    />
  );
};

export const addSpeiMapUpdateDateFormat = () => {
  registerFormatType( "ca-drought-blocks/spei-map-update-date", {
    title: 'SPEI Map Update Date',
    tagName: "span",
    className: "spei-map-update-date",
    edit: SpeiMapUpdateDateButton
  });
};
