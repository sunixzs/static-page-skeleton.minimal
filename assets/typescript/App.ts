import "./Bootstrap/Popover";
import "./Bootstrap/Tooltip";
import { HashScroll } from "./HashScroll";

/**
 * HashScroll
 */
// const $header = $(".page__header");
const hs = new HashScroll();
hs.init();
// hs.setHeaderOffset($header ? $header.height() + 20 : 0).init();

console.log("assets/typescript/App.js works fine!");