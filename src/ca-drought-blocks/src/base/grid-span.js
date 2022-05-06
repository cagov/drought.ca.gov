import {
	RadioControl,
	PanelBody,
} from '@wordpress/components';

export const GridSpanSettings = (props) => {
  const { attributes, setAttributes } = props;
  const { gridSpan } = attributes;

  const onChangeGridSpan = (str) => setAttributes({ gridSpan: str });

  return (
    <PanelBody title="Grid settings">
      <RadioControl
        label="Grid span"
        help="Set how many cells this element will occupy in the layout's hidden three-column grid."
        selected={ gridSpan }
        options={ [
          { label: 'Span 1', value: 'home-grid-span-1' },
          { label: 'Span 2 Desktop', value: 'home-grid-span-2' },
          { label: 'Span 2 Tablet Only', value: 'home-grid-span-2-md' },
          { label: 'Span 3 Desktop', value: 'home-grid-span-3' },
        ] }
        onChange={ onChangeGridSpan }
      />
    </PanelBody>
  )
}