import { createContext, useContext, useState } from "react";
import BookmarkDialog from "@/components/bookmark-dialog";
import { Bookmark } from "@/lib/utils";

type DialogType = "new" | "edit" | null;

interface DialogContextProps {
  openDialog: (type: DialogType, bookmark?: Bookmark) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextProps | null>(null);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>(null);
  const [bookmark, setBookmark] = useState<Bookmark | undefined>(undefined);

  function openDialog(type: DialogType, bookmark?: Bookmark) {
    setDialogType(type);
    setBookmark(bookmark);
    setIsOpen(true);
  }

  function closeDialog() {
    setDialogType(null);
    setBookmark(undefined);
    setIsOpen(false);
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialogType && (
        <BookmarkDialog
          type={dialogType}
          bookmark={bookmark}
          isOpen={isOpen}
          onClose={closeDialog}
        />
      )}
    </DialogContext.Provider>
  );
}

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
}
