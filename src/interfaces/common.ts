
export type TFields = Record<string, unknown>;

export type TFile = {
  src: string;
  data: File | '';
};

export type FileInputProps = {
  type: string;
  file: TFile | string;
  fileInput: React.RefObject<HTMLInputElement>;
  deleteFile: React.MouseEventHandler<HTMLButtonElement>;
  clickFileInput: React.MouseEventHandler<HTMLButtonElement>;
  changeFileInput: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  className?: string;
  required?: boolean;
  defaultFile?: string;
  error?: string;
};

export type Person = {
  image: string;
  name?: string;
  rating?: number;
};

export type TError = {
  text: string;
  code: number;
};
