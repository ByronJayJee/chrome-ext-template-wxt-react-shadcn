export type Tab = chrome.tabs.Tab;

export type UserAction = {
  title: string;
  id: string;
  handler: () => void;
  visible: boolean;
  keybinding?: string[];
};

export type Permissions = chrome.permissions.Permissions;
