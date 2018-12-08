import * as Util from "../util";
import * as Chart from "../chart/chart";
const Facets = {};
Facets.Rect = require("./rect");
Facets.List = require("./list");
Facets.Circle = require("./circle");
Facets.Tree = require("./tree");
Facets.Mirror = require("./mirror");
Facets.Matrix = require("./matrix");
Chart.prototype.facet = function(type, cfg) {
  const cls = Facets[Util.upperFirst(type)];
  if (!cls) {
    throw new Error("Not support such type of facets as: " + type);
  }
  const preFacets = this.get("facets");
  if (preFacets) {
    preFacets.destroy();
  }
  cfg.chart = this;
  const facets = new cls(cfg);
  this.set("facets", facets);
};
