import * as fs from "fs";
import * as path from "path";
import lz from "lz-string";
const concat = require("concat") as (
  folder: string | string[],
  outFile?: string
) => Promise<unknown>;
const minify = require("minify") as (name: string) => string;
const tryToCatch = require("try-to-catch") as (
  fn: Function,
  ...args: string[]
) => Promise<[Error | null, string]>;

export default async (concatFiles: string[]) => {
  const bundle = await concat(concatFiles.map(v => path.resolve(__dirname, v)));
  fs.writeFileSync(path.resolve(__dirname, "mv.temp.js"), bundle);
  const [, mini] = await tryToCatch(minify, "./mv.temp.js");
  const zip = `eval(LZString.decompressFromBase64("${lz.compressToBase64(
    mini
  )}"))`;
  fs.writeFileSync(path.resolve(__dirname, "js/mv.js"), zip);
  fs.unlinkSync(path.resolve(__dirname, "mv.temp.js"));
};
