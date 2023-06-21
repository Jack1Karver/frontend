import { COMMON_LABELS } from '../config/labels.config';
import { Field } from '../interfaces/form';


export const emptyRequired = (field: Field, value: unknown): boolean => {
  return !!field.require && !value;
};

export const notMatchPattern = (field: Field, value: unknown): boolean => {
  return field.pattern !== undefined && typeof value === 'string' && !value.match(field.pattern);
};

export const numberNotValid = (field: Field, value: unknown): boolean => {
  if (field.require && field.validate === 'number' && field.numberOptions && value !== '') {
    const numberParams = field.numberOptions;
    const numberValue = Number(value);
    
    if (
      (numberParams?.min && numberValue < numberParams.min) ||
      (numberParams?.max && numberValue > numberParams.max)
    ) {
      return true;
    }
  }

  return false;
};

export const lengthNotValid = (field: Field, value: unknown): boolean => {
  if (field?.length && typeof value === 'string') {
    const min = field.length?.min ?? 0;
    const max = field.length?.max ?? null;

    if (min && max) {
      return value.length < min || value.length > max;
    } else if (min && !max) {
      return value.length < min;
    } else if (!min && max) {
      return value.length > max;
    }
  }

  return false;
};

/**
 * Returns error message if validation fails.
 */
export const validateFormField = (field: Field, value: unknown): string => {

  
  if(typeof window !== undefined){
    if (emptyRequired(field, value)) {
      return COMMON_LABELS.required;
    }

    if (numberNotValid(field, value)) {
      return field?.numberOptions?.error ?? COMMON_LABELS.required;
    }

    if (notMatchPattern(field, value)) {
      return field?.error ?? COMMON_LABELS.required;
    }

    if (lengthNotValid(field, value)) {
      return field?.length?.error ?? COMMON_LABELS.required;
    }
  }

  return '';
};
