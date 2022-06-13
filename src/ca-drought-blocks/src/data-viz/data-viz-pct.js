import { useSelect } from '@wordpress/data';
import { RichTextToolbarButton } from "@wordpress/block-editor";
import { 
  registerFormatType,
  toggleFormat
} from '@wordpress/rich-text';
import "./style.scss";
import "./editor.scss";

const allowedBlocks = [
  "ca-drought-blocks/reservoir-levels",
  "ca-drought-blocks/snowpack-levels",
  "ca-drought-blocks/data-viz",
]

const DataVizPercentageButton = ({isActive, onChange, value}) => {
  // Get the selected Rich Text block in the editor.
  const selectedBlock = useSelect((select) => select('core/block-editor').getSelectedBlock(), []);

  // If we can't find the definition of the selected block, escape.
  if (!selectedBlock) {
    return null;
  }

  // If the selected block's name is not in our list of allowed blocks (above), escape.
  // This will prevent showing this button anywhere else.
  // if (!allowedBlocks.includes(selectedBlock.name)) {
    // return null;
  // }

  return (
    <RichTextToolbarButton
      icon="lightbulb"
      title="Data Viz Percentage"
      onClick={() => onChange(toggleFormat(value, { type: "ca-drought-blocks/data-viz-pct" }))}
      isActive={isActive}
    />
  );
};

export const addPercentageFormat = () => {
  registerFormatType( "ca-drought-blocks/data-viz-pct", {
    title: 'Data Viz Percentage',
    tagName: "span",
    className: "data-viz-pct",
    edit: DataVizPercentageButton
  });
};
