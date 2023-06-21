import { observer } from 'mobx-react';
import FormStore from '../../stores/form.store';
import Input from './input';

import styles from './scss/input.module.scss';

type InputBlockProps = {
  formStore: FormStore;
  className?: string;
  titleType?: 'small';
  title?: string;
  disabled?: boolean
};

const InputBlock = observer(({ formStore, titleType, title, disabled = false }: InputBlockProps) => {
  return (
    <div className={styles.input__block}>
      {title ? <h2>{title}</h2>: ''}
      {Object.keys(formStore.fields).map(key => {
        const params = formStore.fieldsParams[key];
        return (
          <Input
            key={key}
            type={params.type}
            placeholder={params.placeholder}
            title={params.title}
            disabled={disabled}
            titleType={titleType}
            error={formStore.fields[key].error}
            onChange={e => formStore.setField(formStore.fields[key].name, e.target.value)}
          />
        );
      })}
    </div>
  );
});

export default InputBlock;
