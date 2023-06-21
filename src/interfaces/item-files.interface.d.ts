interface IFileSizes {
  width: number;
  height: number;
}

interface IFileProperties extends IFileSizes {
  size: number;
  mimetype?: string;
  format?: string;
}

interface IItemFiles {
  source: string;
  meta: IFileProperties;
  medium?: string;
  small?: string;
  og?: string;
  preview?: string;
  previewMeta?: string;
  videoPreview?: string;
}
