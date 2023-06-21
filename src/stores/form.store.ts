import { action, makeObservable, observable } from 'mobx';
import { validateFormField } from '../utils/validation.utils';
import { Field, FormFieldState } from '@/interfaces/form';

class FormStore {
  fields: Record<string, FormFieldState> = {};
  fieldsParams: Record<string, Field> = {};
  constructor(params: { [key: string]: Field }) {
    makeObservable(this, {
      fields: observable,
      setFields: action,
      setField: action,
    });
    this.fieldsParams = params;
    this.setFields();
  }

  setFields = () => {
    this.fields = Object.keys(this.fieldsParams).reduce((acc, key) => {
      const field: FormFieldState = {
        name: key,
        value: '',
        error: '',
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[key] = field;

      return acc;
    }, {});
  };

  setField = (name: string, value: string) => {
    this.fields[name].value = value;
    this.fields[name].error = validateFormField(this.fieldsParams[name], value);
  };

  validateFields = () => {
    const valid = Object.keys(this.fields).map(name => {
      this.fields[name].error = validateFormField(this.fieldsParams[name], this.fields[name].value);
      return !this.fields[name].error;
    });

    return valid.reduce((prev, next) => {
      return prev && next;
    });
  };

  getFieldsAccumulator = () => {
    return Object.keys(this.fields).reduce((acc, key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[key] = this.fields[key].value;
      return acc;
    }, {});
  };
}

export default FormStore;
