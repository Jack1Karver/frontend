export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_REGEX = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/;

export const USER_SLUG_REGEX = /^[a-zA-Z0-9:_-]{2,66}$/;

export const COLLECTION_SLUG_REGEX = /^[a-zA-Z0-9_-]{4,30}$/;

export const PUBKEY_REGEX = /^[0-9a-fA-F]{64}$/;

export const EVERSCALE_ADDRESS_REGEX = /^-?[0-9a-fA-F]+:[0-9a-fA-F]{64}$/;

export const ONLY_ZERO = /^0+$/;

export const VALID_NUMBER_REGEX = /^([0]|[1-9][0-9]{0,8})(|\.[0-9]{0,5})?$/g;

export const SOCIALS_REGEX = {
    twitter: /^[a-zA-Z0-9_]{4,15}$/ ,
    telegram: /^[a-zA-Z0-9_]{5,32}$/,
    discord: /^.{2,32}#[0-9]{4}$/,
    instagram: /^[a-zA-Z0-9_.]{1,30}$/
}; 

