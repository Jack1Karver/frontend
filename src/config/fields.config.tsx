import { fieldTypesEnum } from '../enums/field-types.enum';
import { COMMON_LABELS } from './labels.config';
import { EMAIL_REGEX, HOME_REGEX, ISBN_REGEX, PASSWORD_REGEX, TEXT_REGEX } from './regex.config';

export const SIGN_UP_FIELDS = {
  name: {
    type: fieldTypesEnum.text,
    placeholder: 'Ваше имя',
    title: 'Имя',
    require: true,
    disabled: false,
  },
  lastName: {
    type: fieldTypesEnum.text,
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

export const ADDRESS_FIELDS = {
  addrIndex:{
    type: fieldTypesEnum.number,
    placeholder: 'XXXXXX',
    title: 'Индекс',
    validate: 'number',
    require: true,
    length: {
      min: 6,
      max: 6,
      error: 'Индекс должен содержать 6 цифр',
    },
    numberOptions:{
      min: 1,
      error: 'Не может быть отрицательным'
    }
  },
  addrCity:{
    type: fieldTypesEnum.text,
    title: 'Город',
    require: true,
    length: {
      max: 15,
      error: 'Не более 15 символов',
    },
  },
  addrStreet:{
    type: fieldTypesEnum.text,
    title: 'Улица',
    require: true,
    length: {
      max: 25,
      error: 'Не более 25 символов',
    },
  },
  addrHouse:{
    type: fieldTypesEnum.text,
    title: 'Номер дома',
    require: true,
    pattern: HOME_REGEX,
    error: COMMON_LABELS.wrongFormat,
    length: {
      max: 5,
      error: 'Не более 5 символов',
    },
  },
  addrStructure: {
    type: fieldTypesEnum.number,
    title: 'Номер строения',
    require: false,
    validate: 'number',
    length: {
      max: 2,
      error: 'Не более 2 символов',
    },
    numberOptions:{
      min: 1,
      error: 'Не может быть отрицательным'
    }
  },
  addrApart:{
    type: fieldTypesEnum.number,
    title: 'Номер квартиры',
    validate: 'number',
    require: false,
    length: {
      max: 3,
      error: 'Не более 3 символов',
    },
    numberOptions:{
      min: 1,
      error: 'Не может быть отрицательным'
    }
  },
};

export const LOGIN_FIELDS = {
  userName: {
    type: fieldTypesEnum.text,
    placeholder: 'Имя пользователя',
    require: true,
    disabled: false,
  },
  password: {
    type: fieldTypesEnum.password,
    placeholder: 'Пароль',
    require: true,
    disabled: false,
  },
};

export const USER_FIELDS = {
  name: {
    type: fieldTypesEnum.text,
    placeholder: 'Ваше имя',
    title: 'Имя',
    require: true,
  },
  lastName: {
    type: fieldTypesEnum.text,
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
  },
  userName: {
    type: fieldTypesEnum.text,
    placeholder: 'Ваш псевдоним',
    title: 'Псевдоним',
    require: true,
  },
  createdAt: {
    type: fieldTypesEnum.text,
    title: 'Дата регистрации',
    disabled: true,
  },
};

export const AUTHOR_FIELDS = {

  firstName: {
    type: fieldTypesEnum.text,
    title: 'Имя',
    require: true,
    pattern: TEXT_REGEX,
    error: 'Только символы кириллицы и латинницы',
    length: {
      max: 20,
      error: 'Не более 20 символов'
    }
  },
  lastName: {
    type: fieldTypesEnum.text,
    title: 'Фамилия',
    require: true,
    pattern: TEXT_REGEX,
    error: 'Только символы кириллицы и латинницы',
    length: {
      max: 50,
      error: 'Не более 50 символов'
    }
  }
};


export const BOOK_FIELDS={
  bookName:{
    type: fieldTypesEnum.text,
    title: 'Название книги',
    require: true,
    length: {
      max: 50,
      error: 'Не более 50 символов'
    }
  }
};

const date = new Date;

export const OFFER_FIELDS = {
  ISBN:{
    type: fieldTypesEnum.text,
    title: 'ISBN',
    require: false,
    pattern: ISBN_REGEX,
    error: 'Только цифры и знак "-"',
    length:{
      max: 13,
      error: 'Не более 13 символов'
    }
  },
  yearPublishing:{
    type: fieldTypesEnum.number,
    title: 'Год издания',
    validate: 'number',
    require: true,
    length:{
      max: 4,
      error: 'Не более 4 символов'
    },
    numberOptions:{
      max: date.getFullYear(),
      min: 1,
      error: 'Либо вы прилетели сюда на DeLorean DMC-12, либо вы ошиблись'
    }
  }
};

export const TRACK_FIELDS = {
  trackNumber: {
    type: fieldTypesEnum.number,
    validate: 'number',
    require: true,
    length:{
      max: 20,
      error: 'Не более 20 символов'
    },
  }
};
