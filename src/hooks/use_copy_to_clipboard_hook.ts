import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
        setIsCopied(true);
              enqueueSnackbar("copied to clipboard");
      setTimeout(() => setIsCopied(false), 20000); // Reset after 2 seconds
      return true;
    } catch (error) {
      console.error("Failed to copy text: ", error);
      setIsCopied(false);
      return false;
    }
  };

  return { copyToClipboard, isCopied };
}
