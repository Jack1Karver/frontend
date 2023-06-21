import { itemFileTypeEnum } from '@/config/enums/item-file-type.enum';
import { toKb, toMb } from './common.utils';
import { FILE_EXTENSIONS } from '@/config/files.config';

function getImageDimensionsOf(url: string): IFileSizes {
  const image = new Image();
  image.src = url;

  return {
    height: image.height,
    width: image.width,
  };
}

function getVideoDimensionsOf(url: string): Promise<IFileSizes> {
  return new Promise(resolve => {
    const video = document.createElement('video');

    video.addEventListener(
      'loadedmetadata',
      function () {
        const height = this.videoHeight;
        const width = this.videoWidth;

        resolve({ height, width });
      },
      false
    );

    video.src = url;
  });
}

export const getFileMeta = (file: File, src: string): IFileProperties => {
  let dimensions;
    dimensions = getImageDimensionsOf(src);

  const meta = {
    width: dimensions.width,
    height: dimensions.height,
    size: file.size,
    mimetype: file.type,
  };

  return meta;
};

export const formatFileSize = (size: number): string => {
  if (size >= 1000000) {
    return `${toMb(size)} MB`;
  }

  if (size >= 1000) {
    return `${toKb(size)} KB`;
  }

  return `${size} B`;
};

export const getFileExt = (str: string): string => {
  const type = str.includes('.') ? str.split('.') : str.split('/');

  return type[type.length - 1].toLowerCase();
};

export const getGlbOptions = (src: string) => {
  const previewExt = getFileExt(src);

  return [
    {
      value: previewExt,
      label: { en: previewExt.toUpperCase(), ru: previewExt.toUpperCase() },
    },
    {
      value: 'glb',
      label: { en: 'GLB ', ru: 'GLB' },
    },
  ];
};

export const getFileType = (str: string): itemFileTypeEnum => {
  const ext = getFileExt(str);
  const types = Object.keys(FILE_EXTENSIONS) as itemFileTypeEnum[];

  return types.reduce(
    (fileType, type) => (FILE_EXTENSIONS[type as unknown as keyof typeof FILE_EXTENSIONS].includes(ext) ? type : fileType),
    itemFileTypeEnum.image
  );
};
