import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import importJson from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

const devMode = process.env.NODE_ENV === "development";
console.log(`${devMode ? "development" : "production"} mode bundle`);

const pluginName = "SeedsWallet";
const input = "./src/main.js";
const plugins = [nodeResolve(), commonjs(), terser(), importJson()];
const getOutput = ({
  format,
  extension = "js",
  fileName = `main.${format}`,
  buildDir = "dist",
  name,
}) => ({
  file: `./${buildDir}/${fileName}.${extension}`,
  format,
  sourcemap: devMode ? "inline" : false,
  name,
  plugins: [],
});

export default [
  // ES bundle
  // {
  //   input,
  //   plugins,
  //   output: getOutput({ format: "es" }),
  // },
  // IIFE bundle
  // {
  //   input,
  //   plugins,
  //   output: getOutput({ format: "iife" }),
  // },
  // UMD bundle
  // {
  //   input,
  //   plugins,
  //   output: getOutput({ format: "umd", name: pluginName }),
  // },
  // CommonJS bundle
  {
    input,
    plugins: [nodeResolve(), commonjs(), importJson()],
    output: getOutput({ format: "cjs", fileName: "main", extension: "cjs" }),
  },
  // AMD bundle
  // {
  //   input,
  //   plugins,
  //   output: getOutput({ format: "amd" }),
  // },
];
