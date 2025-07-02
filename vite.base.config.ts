import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export const sharedConfig = {
  plugins: [
    react(),
    dts({
      insertTypesEntry: true, // Generate types entry file
      outDir: "build-types", // Output directory for .d.ts files
    }),
  ],
  build: {
    outDir: "build",
    rollupOptions: {
      external: (id) =>
        [
          "react",
          "react-dom",
          "lodash",
          "react/jsx-runtime",
          "immer",
          "styled-components",
          "clsx",
          "react-select",
        ].includes(id) ||
        id.startsWith("@wpmvc") ||
        id.startsWith("@wordpress/") ||
        id.startsWith("@dnd-kit/"),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          lodash: "_",
          immer: "immer",
          "react-select": "reactSelect",
          "styled-components": "styledComponents",
          "@wordpress/components": "wp.components",
          "@wordpress/i18n": "wp.i18n",
          "@wordpress/blocks": "wp.blocks",
          "@wordpress/editor": "wp.editor",
          "@wordpress/element": "wp.element",
          "@wordpress/data": "wp.data",
          "@wordpress/hooks": "wp.hooks",
          "@wordpress/compose": "wp.compose",
          "@wordpress/block-editor": "wp.blockEditor",
          "@wordpress/icons": "wp.icons",
          "@wordpress/api-fetch": "wp.apiFetch",
          "@wordpress/url": "wp.url",
          "@wordpress/viewport": "wp.viewport",
          "@wordpress/dataviews/wp": "wp.dataviewsWp",
          "@wordpress/dataviews": "wp.dataviews",
          clsx: "clsx",
          "@dnd-kit/core": "core",
          "@dnd-kit/sortable": "sortable",
          "@dnd-kit/modifiers": "modifiers",
          "@dnd-kit/utilities": "utilities",
          "@wpmvc/components": "wpmvc.Components",
        },
      },
    },
  },
};
