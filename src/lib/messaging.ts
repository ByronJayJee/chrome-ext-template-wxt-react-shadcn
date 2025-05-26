import { defineExtensionMessaging } from "@webext-core/messaging";
import { Tab, Permissions } from "@/lib/types";

interface ProtocolMap {
  userAction(data: {
    type:
      | "newTab"
      | "newWindow"
      | "muteTab"
      | "unmuteTab"
      | "pinTab"
      | "unpinTab"
      | "addBookmark"
      | "removeBookmark";

    tab?: Tab;
  }): void;
  isBookmarked(data: { tab: Tab }): Promise<boolean>;
  getActiveTab(): Promise<Tab>;
  getPlatformInfo(): Promise<chrome.runtime.PlatformInfo>;
  getPermissions(): Promise<Permissions>;
  toggleMainDialog(): void;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
