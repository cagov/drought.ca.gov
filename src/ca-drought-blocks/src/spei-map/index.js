import { registerBlockType } from "@wordpress/blocks";
import {
	TextControl,
	PanelBody
} from '@wordpress/components';
import { 
  useBlockProps, 
  RichText,
  InspectorControls
} from "@wordpress/block-editor";
import { addSpeiMapDataDateFormat } from "./spei-map-data-date.js";
import { addSpeiMapUpdateDateFormat } from "./spei-map-update-date.js";
import "./style.scss";
import "./editor.scss";

const edit = (props) => {
  const { attributes, setAttributes } = props;
  const { 
    imgHref,
    altText,
    legendHeading,
    extremeWet,
    severeWet,
    moderateWet,
    normal,
    moderateDry,
    severeDry,
    extremeDry
  } = attributes;

  const blockProps = useBlockProps();

  return (
    <>
      <InspectorControls>
        <PanelBody title="SPEI map settings">
          <TextControl
            label="Image URL"
            value={imgHref}
            onChange={(str) => setAttributes({imgHref: str})}
          />
        </PanelBody>
        <PanelBody title="Legend text">
          <TextControl
            label="Heading"
            value={legendHeading}
            onChange={(str) => setAttributes({legendHeading: str})}
          />
          <TextControl
            label="Extreme wet"
            value={extremeWet}
            onChange={(str) => setAttributes({extremeWet: str})}
          />
          <TextControl
            label="Severe wet"
            value={severeWet}
            onChange={(str) => setAttributes({severeWet: str})}
          />
          <TextControl
            label="Moderate wet"
            value={moderateWet}
            onChange={(str) => setAttributes({moderateWet: str})}
          />
          <TextControl
            label="Normal"
            value={normal}
            onChange={(str) => setAttributes({normal: str})}
          />
          <TextControl
            label="Moderate dry"
            value={moderateDry}
            onChange={(str) => setAttributes({moderateDry: str})}
          />
          <TextControl
            label="Severe dry"
            value={severeDry}
            onChange={(str) => setAttributes({severeDry: str})}
          />
          <TextControl
            label="Extreme dry"
            value={extremeDry}
            onChange={(str) => setAttributes({extremeDry: str})}
          />
        </PanelBody>
      </InspectorControls>
      <figure {...blockProps}>
        <drought-spei-map role="img" aria-label={altText}>
          <svg width="200" height="252" viewBox="0 0 200 252" aria-hidden="true">
            <text x="0" y="0" textAnchor="start" dominantBaseline="hanging" className="bold">
              {legendHeading}
            </text>

            <text x="50" y="52" dominantBaseline="middle" textAnchor="start">
              {extremeWet}
            </text>
            <text x="50" y="82" dominantBaseline="middle" textAnchor="start">
              {severeWet}
            </text>
            <text x="50" y="102" dominantBaseline="middle" textAnchor="start">
              {moderateWet}
            </text>
            <text x="50" y="142" dominantBaseline="middle" textAnchor="start">
              {normal}
            </text>
            <text x="50" y="182" dominantBaseline="middle" textAnchor="start">
              {moderateDry}
            </text>
            <text x="50" y="202" dominantBaseline="middle" textAnchor="start">
              {severeDry}
            </text>
            <text x="50" y="232" dominantBaseline="middle" textAnchor="start">
              {extremeDry}
            </text>

            <g stroke="#898891" strokeWidth="1">
              <rect x="1" y="31" width="28" height="20" fill="#260072" />
              <rect x="1" y="51" width="28" height="20" fill="#3C00FE" />
              <line x1="40" y1="33" x2="40" y2="69" />

              <rect x="1" y="71" width="28" height="20" fill="#01B9FF" />
              <line x1="40" y1="73" x2="40" y2="89" />

              <rect x="1" y="91" width="28" height="20" fill="#6EFFD8" />
              <line x1="40" y1="93" x2="40" y2="109" />

              <rect x="1" y="111" width="28" height="20" fill="#00FF19" />
              <rect x="1" y="131" width="28" height="20" fill="#FFFFFF" />
              <rect x="1" y="151" width="28" height="20" fill="#DEFF00" />
              <line x1="40" y1="113" x2="40" y2="169" />

              <rect x="1" y="171" width="28" height="20" fill="#FCD800" />
              <line x1="40" y1="173" x2="40" y2="189" />

              <rect x="1" y="191" width="28" height="20" fill="#FF8601" />
              <line x1="40" y1="193" x2="40" y2="209" />

              <rect x="1" y="211" width="28" height="20" fill="#FE0000" />
              <rect x="1" y="231" width="28" height="20" fill="#B40001" />
              <line x1="40" y1="213" x2="40" y2="249" />
            </g>
          </svg>
          <img loading="lazy" className="spei-map-img" src={imgHref} alt={altText}/>
        </drought-spei-map>
        <RichText
          tagName="figcaption"
          value={altText} 
          onChange={(str) => setAttributes({altText: str})}
          placeholder='Alt description...'
        />
      </figure>
    </>
  );
};

const save = () => null;

registerBlockType("ca-drought-blocks/spei-map", {
  edit,
  save,
});

addSpeiMapUpdateDateFormat();
addSpeiMapDataDateFormat();