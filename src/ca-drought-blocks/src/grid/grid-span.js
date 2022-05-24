import { addFilter } from "@wordpress/hooks";
import { useSelect } from '@wordpress/data';
import { Fragment } from "@wordpress/element";
import { InspectorAdvancedControls } from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";
import { RadioControl, ToggleControl } from "@wordpress/components";

const allowedParents = [
  "ca-drought-blocks/home-grid"
];
const allowedBlocks = [
  "core/group",
  "ca-drought-blocks/data-viz"
];

const allowedSettings = [
  { value: "grid-span-1", label: "Span 1" },
  { value: "grid-span-2", label: "Span 2 Desktop" },
  { value: "grid-span-2-md", label: "Span 2 Tablet Only"},
  { value: "grid-span-3", label: "Span 3 Desktop, Span 2 Tablet" }
]

const insertGridSpanAttributes = (settings, name) => {
  if (settings.attributes && allowedBlocks.includes(name)) {
    settings.attributes = Object.assign(settings.attributes, {
      gridSpanToggle: {
        type: "boolean",
        default: false
      },
      gridSpanSetting: {
        enum: allowedSettings.map(s => s.value),
        default: "grid-span-1"
      }
    })
  }

  return settings;
}

const insertGridSpanControlWidget = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const {
      name,
      attributes,
      setAttributes,
      isSelected
    } = props;
    const { 
      gridSpanToggle,
      gridSpanSetting,
      className 
    } = attributes;

    const onSpanSelection = (str) => {
      const allClasses = className.split(" ");
      const spanClasses = allowedSettings.map(s => s.value);

      const trimmedClasses = allClasses.filter(c => !spanClasses.find(f => f === c));
      const newClassList = [...trimmedClasses, str].join(" ");

      return setAttributes({
        className: newClassList,
        gridSpanSetting: str
      });
    }

    const SettingsWidget = () => {
      if (gridSpanToggle) {
        return (
          <RadioControl
            label="Grid span"
            help="Set how many cells this element will occupy in the layout's hidden three-column grid."
            selected={gridSpanSetting}
            options={allowedSettings}
            onChange={onSpanSelection}
          />
        );
      } else {
        return (<></>);
      }
    }

    const onSpanToggle = (bool) => {
      let newClassList;

      if (className) {
        const allClasses = className.split(" ");
        const spanClasses = allowedSettings.map(s => s.value);
  
        newClassList = allClasses.filter(c => !spanClasses.find(f => f === c));
        
        if (bool) {
          newClassList.push(gridSpanSetting);
        }
      } else {
        newClassList = [gridSpanSetting];
      }

      return setAttributes({
        className: newClassList.join(" "),
        gridSpanToggle: bool
      })
    }

    const toggleAllowed = () => {
      if (!isSelected) { return false; }

      const selectedBlock = useSelect((select) => select("core/block-editor").getSelectedBlock(), []);
      
      if (!selectedBlock || !allowedBlocks.includes(selectedBlock.name)) { return false; }

      const { clientId } = selectedBlock;

      const parentBlock = useSelect((select) => {
        const allParents = select('core/block-editor').getBlockParents(clientId);
    
        if (allParents.length > 0) {
          const nearestParent = select('core/block-editor').getBlock(allParents.slice(-1)[0]);
          return nearestParent;
        }
    
        return null;
      }, []);

      console.log(parentBlock);

      return (parentBlock && allowedParents.includes(parentBlock.name))
        ? true
        : false;
    }

    const ControlWidget = () => {
      if (toggleAllowed()) {
        return (
          <InspectorAdvancedControls>
            <ToggleControl
              label="Enable grid span"
              help="Enables control of how many cells this block will occupy within a layout grid."
              checked={ gridSpanToggle }
              // Need to add className modification here too. See above.
              onChange={onSpanToggle}
            />
            <SettingsWidget/>
          </InspectorAdvancedControls>
        );
      } else {
        return (<></>);
      }
    }

    return (
      <Fragment>
        <BlockEdit {...props}/>
        <ControlWidget/>
      </Fragment>
    )
  }
}, 'insertGridSpanControlWidget');

export const addGridSpans = () => {
  addFilter(
    'blocks.registerBlockType',
    'ca-drought-blocks/grid-span-attributes',
    insertGridSpanAttributes
  );

  addFilter(
    'editor.BlockEdit',
    'ca-drought-blocks/grid-span-control-widget',
    insertGridSpanControlWidget
  );
}