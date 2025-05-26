import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "BJG Chrome Extension Template",
    description: "chrome-ext with popup, sidepanel, and hidden dialog panel",
    permissions: ["storage"],
    optional_permissions: ["bookmarks"],
    commands: {
      toggleMainDialog: {
        suggested_key: {
          default: "Alt+J",
        },
        description: "Toggle the main dialog",
      },
    },
  },
});
