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
  // Off: dist/ is committed to git (consumers install this repo directly,
  // no install-time build - see package.json), and a sourcemap embeds the
  // building machine's absolute src/ path, so it diffs on every rebuild
  // even when index.js/index.d.ts are byte-identical - which defeats the
  // dist-freshness CI check (npm run check:dist) that relies on a clean
  // `git diff --exit-code dist/` after a fresh build.
  sourcemap: false,
  clean: true,
  splitting: false,
  external: ["react", "react-dom", "react-i18next", "react-router-dom", "flag-icons/css/flag-icons.min.css"],
  esbuildPlugins: [atAlias],
});
