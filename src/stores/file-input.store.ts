import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import { notify } from '@/utils/common.utils';
import { MAX_FILE_SIZES } from '@/config/files.config';
import { FILE_EXTENSION_ERROR, FILE_SIZE_ERROR } from '@/config/labels.config';
import { IFileInput } from '@/interfaces/file-input.interface';

export default class FileInputStore {
  input: React.RefObject<HTMLInputElement>;
  files: IFileInput[] = [];
  maxFileSize: number;

  constructor(input: React.RefObject<HTMLInputElement>, maxFileSize = MAX_FILE_SIZES.token.bytes) {
    makeObservable(this, {
      files: observable,
      pushFile: action,
    });

    this.maxFileSize = maxFileSize;
    this.input = input;
    this.files = [];
  }

  pushFile = (file: IFileInput): void => {
    this.files.push(file);
  };

  clickFileInput = (): void => {
    if (this.input.current) {
      this.input.current.click();
    }
  };

  changeFileInput = async (): Promise<void> => {
    if (this.input.current && this.input.current.files && this.input.current.files[0]) {
      const fileExtensions = this.input.current?.accept
        ? this.input.current.accept.split(', ').map(ext => ext.replace('.', ''))
        : [];

      const file = this.input.current.files[0];

      const fileInfo = file.type.split('/');
      const extension = fileInfo[fileInfo.length - 1].toLowerCase();

      if (typeof window !== 'undefined') {
        if (fileExtensions && !fileExtensions.includes(extension)) {
          notify(FILE_EXTENSION_ERROR);
        } else if (file.size > this.maxFileSize) {
          notify(FILE_SIZE_ERROR);
        } else {
          this.pushFile({ file, id: file.name, src: await this.updateFileSrc(file) });
        }
      }
    }
  };

  updateFileSrc = async (file: File): Promise<string> => {
    const src = await this.getSrcFromFile(file);
    return src;
  };

  getSrcFromFile = (file: File): Promise<string> => {
    return new Promise(resolve => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === 'string') {
          resolve(e.target.result);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  deleteFile = (id: string): void => {
    if (this.input.current) {
      this.input.current.value = '';
    }

    this.files = this.files.filter(file => {
      return file.id !== id;
    });
  };
}
