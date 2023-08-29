import { registerBlockType } from "@wordpress/blocks";
import { 
  useBlockProps, 
  useInnerBlocksProps, 
  InnerBlocks
} from "@wordpress/block-editor";
import { addPercentageFormat } from "./data-viz-pct.js";
import "./style.scss";
import "./editor.scss";

const edit = () => {
  const blockProps = useBlockProps({
    className: `data-viz`,
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
        ["ca-drought-blocks/div", 
          { 
            className: "data-viz-desc",
            lock: { move: true, remove: true } 
          }, 
          [
            ["core/paragraph", { placeholder: "Data visual description..." }]
          ]
        ],
        ["ca-drought-blocks/div", 
          { 
            className: "data-viz-placement",
            lock: { move: true, remove: true }
          },
          [
            ["core/html"]
          ]
        ],
        ["ca-drought-blocks/div", 
          { 
            className: "data-viz-footer",
            lock: { move: true, remove: true } 
          }, 
          [
            ["ca-drought-blocks/div", 
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
    <div {...innerBlocksProps}></div>
  );
}

const save = () => <InnerBlocks.Content />;

registerBlockType("ca-drought-blocks/data-viz", {
  edit,
  save,
});

addPercentageFormat();