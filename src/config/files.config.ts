import { itemFileTypeEnum } from "./enums/item-file-type.enum";


const FILE_EXTENSIONS = {
  [itemFileTypeEnum.image]: ['jpg', 'jpeg', 'png', 'webp'],
  [itemFileTypeEnum.gif]: ['gif'],
  [itemFileTypeEnum.video]: ['mp4'],
};

const toBytes = (mb: number) => mb * 1024 * 1024;

const MAX_FILE_SIZES = {
  cover: {
    mb: 2,
    bytes: toBytes(2),
  },
  avatar: {
    mb: 0.5,
    bytes: toBytes(0.5),
  },
  token: {
    mb: 50,
    bytes: toBytes(50),
  },
  preview: {
    mb: 5,
    bytes: toBytes(5),
  },
};

export { MAX_FILE_SIZES, FILE_EXTENSIONS };
