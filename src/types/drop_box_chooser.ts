declare module "react-dropbox-chooser" {
  import React from "react";

  interface DropboxChooserProps {
    appKey: string;

    success: (files: []) => void;

    cancel?: () => void;

    multiselect?: boolean;

    extensions?: string[];

    linkType?: "preview" | "direct";

    folderselect?: boolean;

    sizeLimit?: number;

    children?: React.ReactNode;
  }

  const DropboxChooser: React.FC<DropboxChooserProps>;

  export default DropboxChooser;
}
