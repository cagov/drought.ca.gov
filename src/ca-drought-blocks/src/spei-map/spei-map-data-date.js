import { useSelect } from '@wordpress/data';
import { RichTextToolbarButton } from "@wordpress/block-editor";
import { 
  registerFormatType,
  toggleFormat
} from '@wordpress/rich-text';
import "./style.scss";
import "./editor.scss";

const SpeiMapDataDateButton = ({isActive, onChange, value}) => {
  // Get the selected Rich Text block in the editor.
  const selectedBlock = useSelect((select) => select('core/block-editor').getSelectedBlock(), []);

  // If we can't find the definition of the selected block, escape.
  if (!selectedBlock) {
    return null;
  }

  return (
    <RichTextToolbarButton
      icon="lightbulb"
      title="SPEI Map Data Range Date"
      onClick={() => onChange(toggleFormat(value, { type: "ca-drought-blocks/spei-map-data-date" }))}
      isActive={isActive}
    />
  );
};

export const addSpeiMapDataDateFormat = () => {
  registerFormatType( "ca-drought-blocks/spei-map-data-date", {
    title: 'SPEI Map Data Range Date',
    tagName: "span",
    className: "spei-map-data-date",
    edit: SpeiMapDataDateButton
  });
};
