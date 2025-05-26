const showKeybindings = storage.defineItem<boolean>("local:showKeybindings", {
  defaultValue: true,
  fallback: true,
  version: 1,
});

// Export everything under the store object
export const store = {
  showKeybindings,
};
