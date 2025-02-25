import { useCallback, useEffect } from "react";

/**
 * Hook to handle global keyboard shortcuts.
 * @param shortcuts - An object where keys map to actions.
 */
export function useShortcuts(shortcuts: Record<string, () => void>) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const activeElement = document.activeElement;

      // Unfocus (blur) when Escape is pressed
      if (event.key === "Escape" && activeElement instanceof HTMLElement) {
        activeElement.blur();
        return;
      }

      // Ignore if already focused in an input, textarea, or contenteditable element
      if (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        (activeElement &&
          activeElement.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      // Execute shortcut action if it exists
      const action = shortcuts[event.key];

      if (action) {
        event.preventDefault();
        action();
      }
    },
    [shortcuts],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
}
