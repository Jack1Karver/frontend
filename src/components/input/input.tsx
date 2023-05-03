import { EventHandler } from 'react';
import styles from './scss/input.module.scss';
import ErrorMessage from './error-message/error-message';
type InputProps = {
  type: string;
  placeholder?: string;
  mod?: 'brand' | 'default' ;
  label?: string;
  title?: string;
  titleType?: 'small'
  onChange?: EventHandler<any>;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
  margin?: 'mb-0'; 

};

const Input = (props: InputProps) => {
  return (
    <>
      {props.type !== 'checkbox' ? (
        <div className = {styles.input__field}>
          {props.title ? <h3 className={`${styles.input__title} ${props.titleType? styles[`input__title--${props.titleType}`]: ''} ${props.disabled ? styles['input__title--disabled']:''}` }>{props.title}</h3> : ''}
          <input
            className={`${styles.input} ${props.mod ? styles[`input--${props.mod}`] : ''} ${props.disabled ? styles['input--disabled']:''} ${props.margin ? styles[`input--${props.margin}`] : ''}`}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            disabled={props.disabled ? props.disabled : false}
            defaultValue={props.defaultValue ? props.defaultValue : undefined}
          />
          {props.error && <ErrorMessage error={props.error}/>}
        </div>
      ) : (
        <div className={styles.input__checkbox}>
          <input className={`${styles.input} ${props.disabled ? styles['input--disabled']:''}`} disabled={props.disabled} type={props.type} onChange={props.onChange}/>
          <label className={props.disabled ? styles['input__title--disabled']:''}>{props.label}</label>
        </div>
      )}
    </>
  );
};

export default Input;
