import { registerBlockType } from "@wordpress/blocks";
import { 
  useBlockProps, 
  useInnerBlocksProps, 
  InnerBlocks, 
  InspectorControls 
} from "@wordpress/block-editor";
import { GridSpanSettings } from "../base/grid-span";
import "./style.scss";
import "./editor.scss";

const edit = (props) => {
  const { gridSpan } = props.attributes;

  const blockProps = useBlockProps({
    className: `data-viz ${gridSpan}`,
  });

  const innerBlocksProps = useInnerBlocksProps(
    blockProps,
    {
      template: [
        ["core/heading", 
          { 
            level: 4, 
            placeholder: "Data visual heading..." ,
            lock: { move: true, remove: true }
          }
        ],
        ["core/group", 
          { 
            className: "data-viz-desc",
            lock: { move: true, remove: true } 
          }, 
          [
            ["core/paragraph", { placeholder: "Data visual description..." }]
          ]
        ],
        ["core/group", 
          { 
            className: "data-viz-placement",
            lock: { move: true, remove: true }
          }, 
          [
            ["core/html"]
          ]],
        ["core/group", 
          { 
            className: "data-viz-footer",
            lock: { move: true, remove: true } 
          }, 
          [
            ["core/group", 
              { 
                className: "data-viz-freq" 
              }, 
              [
                ["core/paragraph", { placeholder: "Data update frequency..." }]
              ]
            ],
            ["core/paragraph", { placeholder: "Add a link..." }]
          ]
        ]
      ],
      templateLock: false,
    }
  );

  return (
    <>
      <InspectorControls>
        { <GridSpanSettings {...props}/> }
      </InspectorControls>
      <div {...innerBlocksProps}></div>
    </>
  );
}


const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/data-viz", {
  edit,
  save,
});
