import React, { ReactElement, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';

import styles from '@/modules/create/scss/create.module.scss';
import formStyles from './scss/form.module.scss';
import CloseIcon from 'src/resources/img/close.svg';
import { MAX_FILE_SIZES } from '@/config/files.config';
import { getFileType } from '@/utils/files.utils';
import FileInputStore from '@/stores/file-input.store';
import Button from '../button/button';
import { toMb } from '@/utils/common.utils';
import { IFileInput } from '@/interfaces/file-input.interface';


type FileInputProps = {
  id: string;
  setFiles: ( files: IFileInput[]) => void;
  extensions: string[];
  maxSize?: number;
  label?: string;
  className?: string;
  required?: boolean;
  defaultFile?: string;
  error?: string;
};

const FileInputToken = observer(({ ...props }: FileInputProps): ReactElement => {
  const { id, extensions, error, maxSize = MAX_FILE_SIZES.token.bytes } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputState = useMemo(() => new FileInputStore(inputRef, maxSize), [id]);

  useEffect(() => {
    reaction(
      () => fileInputState.files.length,
      ()=> props.setFiles(fileInputState.files)
    );
  }, [id]);

  const FilePreview = 
    fileInputState.files.length ? (
      <>
      <h5>{'Uploaded'}</h5>
      <div className={styles['create__file-preview-block']}>
        {fileInputState.files.map(file => {
          return (
            <div className={styles['create__file-preview']}>
              <img src={file.src} alt="" />
              <Button
                size={'xs'}
                mod={'brand'}
                className={styles['create__file-edit-btn']}
                onClick={()=>fileInputState.deleteFile(file.id)}
                content={<CloseIcon />}
              />
            </div>
          );
        })}
      </div>
      </>
    ) : null;

  const CustomFileInput = () => (
    <>
      <label htmlFor="file" className={styles['create__file-label']}>
          <div className={styles['create__file-text']}>
            <div>{extensions.map(item => item.toUpperCase()).join(', ')}.</div>
            {'MAX'} {toMb(maxSize)} MB.
          </div>
          <Button
            size={'sm'}
            mod={'empty'}
            onClick={fileInputState.clickFileInput}
            className={`${styles['create__file-btn']} ${error ? styles['create__file-btn--error'] : ''}`}
            content={'Choose file'}
          />
      </label>
    </>
  );

  return (
    <div
      className={`${props.className ? props.className : ''} ${formStyles.form__field} ${
        props.label ? formStyles['form__field--label'] : ''
      }`}
    >
      <h5>{'Upload photos'}</h5>
      <div className={`${formStyles.form__control} ${formStyles['form__control--file']}`}>
        {props.label && (
          <div className={formStyles.form__label}>
            <label htmlFor={props.id}>{props.label}</label>
          </div>
        )}

        <div className={`${styles.create__file} ${props.error ? styles['create__file--error'] : ''}`}>
          <CustomFileInput />
          <input
            ref={inputRef}
            type="file"
            id={props.id}
            className={styles['create__file-input']}
            onChange={fileInputState.changeFileInput}
            accept={extensions.map(ext => '.' + ext).join(', ')}
          />          
        </div>
        {FilePreview}
      </div>
    </div>
  );
});

export default FileInputToken;
