const concat = require("concat");
const minify = require("minify");
const tryToCatch = require("try-to-catch");
const fs = require("fs");
const path = require("path");
const lz = require("lz-string");

(async () => {
  const bundle = await concat(
    [
      "js/libs/pixi.js",
      "js/libs/pixi-tilemap.js",
      "js/libs/pixi-picture.js",
      "js/libs/fpsmeter.js",
      "js/libs/iphone-inline-video.browser.js",
      "js/rpg_core.js",
      "js/rpg_managers.js",
      "js/rpg_objects.js",
      "js/rpg_scenes.js",
      "js/rpg_sprites.js",
      "js/rpg_windows.js"
    ].map(v => path.resolve(__dirname, v))
  );
  fs.writeFileSync(path.resolve(__dirname, "mv.temp.js"), bundle);
  const [, mini] = await tryToCatch(minify, "./mv.temp.js");
  const zip = `eval(LZString.decompressFromBase64("${lz.compressToBase64(
    mini
  )}"))`;
  fs.writeFileSync(path.resolve(__dirname, "js/mv.js"), zip);
  fs.unlinkSync(path.resolve(__dirname, "mv.temp.js"));
})();
