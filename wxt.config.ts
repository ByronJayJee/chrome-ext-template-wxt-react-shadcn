import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "Command Palette",
    description: "A command palette to quickly perform actions",
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
