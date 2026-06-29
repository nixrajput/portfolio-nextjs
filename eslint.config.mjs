import { createRequire } from "module";

const require = createRequire(import.meta.url);

const coreWebVitals = require("eslint-config-next/core-web-vitals");
const nextTypescript = require("eslint-config-next/typescript");

const eslintConfig = [
  ...coreWebVitals,
  ...nextTypescript,
  {
    ignores: ["**/.next/**", "node_modules/**", "next-env.d.ts", ".claude/**", "drizzle/**"],
  },
];

export default eslintConfig;
