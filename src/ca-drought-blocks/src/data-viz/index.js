import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import edit from "./edit";
import save from "./save";

registerBlockType("ca-drought-blocks/data-viz-box", {
  edit,
  save,
});
