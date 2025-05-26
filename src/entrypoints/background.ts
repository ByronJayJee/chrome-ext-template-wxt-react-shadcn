import { onMessage, sendMessage } from "@/lib/messaging";

export default defineBackground(() => {
  onMessage("userAction", (userAction) => {
    switch (userAction.data.type) {
      case "newTab":
        browser.tabs.create({});
        break;

      case "newWindow":
        browser.windows.create({});
        break;

      case "muteTab":
        if (userAction.data.tab?.id) {
          browser.tabs.update(userAction.data.tab.id, { muted: true });
        }
        break;

      case "unmuteTab":
        if (userAction.data.tab?.id) {
          browser.tabs.update(userAction.data.tab.id, { muted: false });
        }
        break;

      case "pinTab":
        if (userAction.data.tab?.id) {
          browser.tabs.update(userAction.data.tab.id, { pinned: true });
        }
        break;

      case "unpinTab":
        if (userAction.data.tab?.id) {
          browser.tabs.update(userAction.data.tab.id, { pinned: false });
        }
        break;

      case "addBookmark":
        if (userAction.data.tab?.id) {
          browser.bookmarks.create({
            title: userAction.data.tab.title,
            url: userAction.data.tab.url,
          });
        }
        break;

      case "removeBookmark":
        if (userAction.data.tab?.id) {
          browser.bookmarks
            .search({ url: userAction.data.tab.url })
            .then((bookmarks) => {
              if (bookmarks.length) {
                browser.bookmarks.remove(bookmarks[0].id);
              }
            });
        }
        break;
    }
  });

  onMessage("isBookmarked", async (message) => {
    if (!message.data.tab?.url) return false;
    const bookmarks = await browser.bookmarks.search({
      url: message.data.tab.url,
    });
    return bookmarks.length > 0;
  });

  onMessage("getActiveTab", async () => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tabs[0];
  });

  onMessage("getPlatformInfo", async () => {
    return browser.runtime.getPlatformInfo();
  });

  onMessage("getPermissions", async () => {
    return browser.permissions.getAll();
  });

  //Main dialog command listener
  browser.commands.onCommand.addListener((command) => {
    if (command === "toggleMainDialog") {
      browser.tabs
        .query({
          active: true,
          currentWindow: true,
        })
        .then((tabs) => {
          if (tabs[0]?.id) {
            sendMessage("toggleMainDialog", undefined, tabs[0].id);
          }
        });
    }
  });
});
