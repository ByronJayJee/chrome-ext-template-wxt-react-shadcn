import * as React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { getUserActions } from "@/lib/user.actions";
import { UserAction } from "@/lib/types";
import { store } from "@/lib/storage";
import { onMessage } from "@/lib/messaging";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [userActions, setUserActions] = React.useState<UserAction[]>([]);
  const [showKeybindings, setShowKeybindings] = React.useState(true);

  React.useEffect(() => {
    const removeListener = onMessage("toggleMainDialog", () => {
      setOpen((open) => !open);
    });
    return () => removeListener();
  }, []);

  // Unused listener
  // React.useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
  //       e.preventDefault();
  //       setOpen((open) => !open);
  //     }
  //   };
  //
  //   document.addEventListener("keydown", down);
  //   return () => document.removeEventListener("keydown", down);
  // }, []);

  React.useEffect(() => {
    if (!open) return;
    store.showKeybindings.getValue().then(setShowKeybindings);
    getUserActions().then(setUserActions);
    const unwatch = store.showKeybindings.watch(setShowKeybindings);

    return () => unwatch();
  }, [open]);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command loop={true} className="max-h-96 min-h-96 rounded-lg shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {userActions.map((action) => (
              <CommandItem
                key={action.id}
                value={action.title}
                onSelect={() => {
                  action.handler();
                  setOpen(false);
                }}
              >
                <span className="flex-1 truncate px-3 text-start">
                  {action.title}
                </span>
                {action.keybinding && showKeybindings && (
                  <div className="flex items-center space-x-2">
                    {action.keybinding.map((key, i) => (
                      <div>
                        <kbd
                          key={key}
                          className="px-2 py-1 text-foreground bg-accent rounded text-sm text-center"
                        >
                          {key}
                        </kbd>
                        <span>
                          {action.keybinding?.length &&
                          i < action.keybinding.length - 1
                            ? "+"
                            : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
