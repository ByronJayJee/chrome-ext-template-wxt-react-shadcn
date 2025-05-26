import { sendMessage } from "@/lib/messaging";
import type { Tab, UserAction } from "@/lib/types";

const getBookmarkStatus = async (
  tab: Tab,
): Promise<[hasBookmarksPermission: boolean, isBookmarked: boolean]> => {
  const permissionsInfo = await sendMessage("getPermissions", undefined);
  const hasBookmarksPermission =
    permissionsInfo.permissions?.includes("bookmarks");
  if (!hasBookmarksPermission) {
    return [false, false];
  }
  const isBookmarked = await sendMessage("isBookmarked", { tab });
  return [hasBookmarksPermission, isBookmarked];
};

export const getUserActions = async (): Promise<UserAction[]> => {
  const activeTab = await sendMessage("getActiveTab", undefined);
  const isMuted: boolean = activeTab.mutedInfo?.muted || false;
  const isPinned: boolean = activeTab.pinned || false;

  const platform = await sendMessage("getPlatformInfo", undefined);
  const isMac = platform.os === "mac";
  const [hasBookmarksPermission, isBookmarked] =
    await getBookmarkStatus(activeTab);

  const userActions: UserAction[] = [
    {
      title: "New Tab",
      id: "newTab",
      handler: () => {
        sendMessage("userAction", { type: "newTab" });
      },
      visible: true,
      keybinding: ["Command", "T"],
    },
    {
      title: "New Window",
      id: "newWindow",
      handler: () => {
        sendMessage("userAction", { type: "newWindow" });
      },
      visible: true,
      keybinding: ["Command", "N"],
    },
    {
      title: "Mute Tab",
      id: "muteTab",
      handler: () => {
        sendMessage("userAction", { type: "muteTab", tab: activeTab });
      },
      visible: !isMuted,
      keybinding: isMac ? ["Command", "Shift", "M"] : ["Command", "M"],
    },
    {
      title: "Unmute Tab",
      id: "unmuteTab",
      handler: () => {
        sendMessage("userAction", { type: "unmuteTab", tab: activeTab });
      },
      visible: isMuted,
      keybinding: isMac ? ["Command", "Shift", "M"] : ["Command", "M"],
    },
    {
      title: "Pin Tab",
      id: "pinTab",
      handler: () => {
        sendMessage("userAction", { type: "pinTab", tab: activeTab });
      },
      visible: !isPinned,
    },
    {
      title: "Unpin Tab",
      id: "unpinTab",
      handler: () => {
        sendMessage("userAction", { type: "unpinTab", tab: activeTab });
      },
      visible: isPinned,
    },
    {
      title: "Add Bookmark",
      id: "addBookmark",
      handler: () => {
        sendMessage("userAction", { type: "addBookmark", tab: activeTab });
      },
      visible: hasBookmarksPermission && !isBookmarked,
      keybinding: ["Command", "D"],
    },
    {
      title: "Remove Bookmark",
      id: "removeBookmark",
      handler: () => {
        sendMessage("userAction", { type: "removeBookmark", tab: activeTab });
      },
      visible: hasBookmarksPermission && isBookmarked,
      keybinding: ["Command", "D"],
    },
  ];

  const visibleActions = userActions.filter((action) => action.visible);

  // change Ctrl to '⌘' on Mac, Alt to '⌥' and Shift to '⇧'
  const formattedActions = visibleActions.map((action) => {
    action.keybinding = action.keybinding?.map((key) => {
      if (key === "Command") {
        return isMac ? "⌘" : "Ctrl";
      } else if (key === "Alt") {
        return isMac ? "⌥" : "Alt";
      } else if (key === "Shift") {
        return isMac ? "⇧" : "Shift";
      }
      return key;
    });
    return action;
  });
  return formattedActions;
};
