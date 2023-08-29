import { useSelect } from '@wordpress/data';
import { RichTextToolbarButton } from "@wordpress/block-editor";
import { 
  registerFormatType,
  toggleFormat
} from '@wordpress/rich-text';
import "./style.scss";
import "./editor.scss";

const allowedBlocks = [
  "ca-drought-blocks/highlight-box-item"
]

const HighlightBoxFigureButton = ({isActive, onChange, value}) => {
  // Get the selected Rich Text block in the editor.
  const selectedBlock = useSelect((select) => select('core/block-editor').getSelectedBlock(), []);

  // If we can't find the definition of the selected block, escape.
  if (!selectedBlock) {
    return null;
  }

  // We need to get the parent block to ensure it's a highlight-box-item.
  const { clientId } = selectedBlock;
  const parentBlock = useSelect((select) => {
    const allParents = select('core/block-editor').getBlockParents(clientId);

    if (allParents.length > 0) {
      const nearestParent = select('core/block-editor').getBlock(allParents.slice(-2)[0]);
      return nearestParent;
    }

    return null;
  }, []);

  // If the parent block's name is not in our list of allowed blocks (above), escape.
  // This will prevent showing this button anywhere else.
  if (!parentBlock || !allowedBlocks.includes(parentBlock.name)) {
    return null;
  }

  return (
    <RichTextToolbarButton
      icon="lightbulb"
      title="Highlight Box Figure"
      onClick={() => onChange(toggleFormat(value, { type: "ca-drought-blocks/highlight-box-figure" }))}
      isActive={isActive}
    />
  );
};

export const addFigureFormat = () => {
  registerFormatType( "ca-drought-blocks/highlight-box-figure", {
    title: 'Highlight Box Figure',
    tagName: "span",
    className: "highlight-box-figure",
    edit: HighlightBoxFigureButton
  });
};
