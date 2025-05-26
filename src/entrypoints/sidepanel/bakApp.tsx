import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { store } from "@/lib/storage";
import { Label } from "@/components/ui/label";
import { sendMessage } from "@/lib/messaging";
import { Button } from "@/components/ui/button";

function App() {
  const [showKeybindings, setShowKeybindings] = useState(true);
  const [hasBookmarkPermission, setHasBookmarkPermission] = useState(false);

  useEffect(() => {
    store.showKeybindings.getValue().then(setShowKeybindings);
  }, []);

  useEffect(() => {
    const onload = async () => {
      const permissionsInfo = await sendMessage("getPermissions", undefined);
      //permissionsInfo contains permissions as well as origins, we only need permissions
      if (permissionsInfo.permissions?.includes("bookmarks")) {
        setHasBookmarkPermission(true);
      }
    };
    onload();
  }, []);

  const requestBookmarksPermission = async () => {
    if (!hasBookmarkPermission) {
      const granted = await browser.permissions.request({
        permissions: ["bookmarks"],
      });

      if (granted) {
        setHasBookmarkPermission(true);
      }
    }
  };

  return (
    <div className="m-3 w-72 flex flex-col">
      <h1 className="text-lg font-bold mb-3">Settings</h1>
      <div className="flex items-center justify-between mb-3">
        <Label htmlFor="showKeybindings" className="font-normal">
          Show keybindings
        </Label>
        <Switch
          id="showKeybindings"
          checked={showKeybindings}
          onCheckedChange={(checked) => {
            store.showKeybindings.setValue(checked);
            setShowKeybindings(checked);
          }}
        ></Switch>
      </div>
      {hasBookmarkPermission ? (
        <span className="text-sm text-wrap mr-2">
          Bookmarks permission granted
        </span>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm text-wrap mr-2">
            Request bookmarks permission(required for adding/removing bookmarks)
          </span>
          <Button className="font-normal" onClick={requestBookmarksPermission}>
            Request
          </Button>
        </div>
      )}
    </div>
  );
}
export default App;
