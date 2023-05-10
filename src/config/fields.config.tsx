import { fieldTypesEnum } from './enums/field-types.enum';
import { COMMON_LABELS } from './labels.config';
import { EMAIL_REGEX, PASSWORD_REGEX} from './regex.config';

export const CAR_FEATURES_FIELD = {
  mark: {
    type: fieldTypesEnum.select,
    placeholder: 'Mark',
    title: 'Mark',
    require: true,
    disabled: false,
  },
  model: {
    type: fieldTypesEnum.select,
    placeholder: 'Ваша фамилия',
    title: 'Фамилия',
    require: true,
  },
  secondName: {
    type: fieldTypesEnum.text,
    placeholder: 'Ваше отчество',
    title: 'Отчество',
    require: false,
  },
  email: {
    type: fieldTypesEnum.text,
    placeholder: 'example@exampe.com',
    title: 'Электронная почта',
    require: true,
    pattern: EMAIL_REGEX,
    error: COMMON_LABELS.wrongFormat,
  },
  userName: {
    type: fieldTypesEnum.text,
    placeholder: 'Ваш псевдоним',
    title: 'Псевдоним',
    require: true,
  },
  password: {
    type: fieldTypesEnum.password,
    title: 'Пароль',
    require: true,
    pattern: PASSWORD_REGEX,
    error: 'Не менее 8 символов, пароль должен содержать цифры, заглавные и строчные буквы',
    length: {
      min: 8,
      error: 'Не менее 8 символов',
    },
  },
};


