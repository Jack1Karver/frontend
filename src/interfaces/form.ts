import { fieldTypesEnum } from '@/config/enums/field-types.enum';
import { ReactElement } from 'react';

export type Field = {
  type: fieldTypesEnum;
  validate?: string;
  placeholder?: string;
  title?: string;
  description?: string;
  value?: string;
  disabled?: boolean;
  require?: boolean;
  pattern?: RegExp;
  error?: string;
  defaultValue?: string;
  suffix?: string;
  options?: SelectOption[];
  numberOptions?: NumberOptions;
  length?: {
    min?: number;
    max?: number;
    error: string;
  };
};

export type NumberOptions = {
  min?: number;
  max?: number;
  error?: string;
};

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: string | ReactElement;
};

export type FormFieldState = {
    name: string;
    value: string | undefined;
    error: string;
  };