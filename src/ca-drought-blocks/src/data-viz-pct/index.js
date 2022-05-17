import { useSelect } from '@wordpress/data';
import { RichTextToolbarButton } from "@wordpress/block-editor";
import { 
  registerFormatType,
  toggleFormat
} from '@wordpress/rich-text';
import "./style.scss";
import "./editor.scss";

const DataVizPercentageButton = ({isActive, onChange, value}) => {
  const selectedBlock = useSelect((select) => select('core/block-editor').getSelectedBlock(), []);

  if (selectedBlock && selectedBlock.name !== 'ca-drought-blocks/reservoir-levels') {
    return null;
  }

  return (
    <RichTextToolbarButton
      icon="lightbulb"
      title="Data Viz Percentage"
      onClick={() => onChange(toggleFormat(value, { type: 'ca-drought-blocks/data-viz-pct' }))}
      isActive={isActive}
    />
  );
};

registerFormatType( "ca-drought-blocks/data-viz-pct", {
  title: 'Data Viz Percentage',
  tagName: "span",
  className: "data-viz-pct",
  edit: DataVizPercentageButton
});
