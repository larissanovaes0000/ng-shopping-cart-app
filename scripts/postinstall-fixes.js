const fs = require("fs");
const path = require("path");

const pluginPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "circular-dependency-plugin",
  "index.js",
);

function patchCircularDependencyPlugin() {
  if (!fs.existsSync(pluginPath)) {
    return;
  }

  const file = fs.readFileSync(pluginPath, "utf8");
  if (file.includes("Object.assign({")) {
    return;
  }

  const next = file
    .replace("let extend = require('util')._extend\n", "")
    .replace("this.options = extend({", "this.options = Object.assign({");

  fs.writeFileSync(pluginPath, next, "utf8");
}

patchCircularDependencyPlugin();
