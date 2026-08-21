import { defineConfig } from "tsup";
import path from "node:path";
import fs from "node:fs";
import type { Plugin } from "esbuild";

// The copied files still use the monorepo's `@/` alias convention (kept deliberately —
// see README: this avoids rewriting every import statement, and keeps files diffable
// against their monorepo source). This plugin resolves `@/x` -> `src/x` at build time,
// the same way the monorepo's own tsconfig/vite alias does. Must resolve to a concrete
// extension (esbuild's onResolve return value is NOT extension-probed like a bare
// specifier would be) and mark `resolveDir` so the resolved file's own relative imports
// keep working.
const EXTENSIONS = [".tsx", ".ts", "/index.tsx", "/index.ts"];

const atAlias: Plugin = {
  name: "at-alias",
  setup(build) {
    build.onResolve({ filter: /^@\// }, (args) => {
      const base = path.resolve(__dirname, "src", args.path.slice(2));
      for (const ext of EXTENSIONS) {
        const candidate = base + ext;
        if (fs.existsSync(candidate)) {
          return { path: candidate };
        }
      }
      throw new Error(`at-alias: could not resolve "${args.path}" (tried ${base}.{tsx,ts})`);
    });
  },
};

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  external: ["react", "react-dom", "react-i18next", "flag-icons/css/flag-icons.min.css"],
  esbuildPlugins: [atAlias],
});
