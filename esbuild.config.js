// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/main.js'],
  bundle: true,
  outfile: './dist/bundle.js',
  external: ['three'], // <--- Mark as external
  // optionally:
  // external: ['three', 'three/examples/jsm/exporters/USDZExporter.js'],
}).catch(() => process.exit(1));
