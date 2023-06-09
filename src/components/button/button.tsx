import { MouseEventHandler, ReactElement } from 'react';
import styles from './scss/styles.module.scss';

type ButtonProps = {
  mod?: 'brand' | 'grey' | 'empty';
  size?: 'wide' | 'md' | 'xs' | 'sm';
  content: string | ReactElement;
  onClick?: MouseEventHandler;
  className?: string;
};

const Button = ({ size, content, mod, onClick, className }: ButtonProps) => {

  return (
    <button
      className={`${styles.button} ${className} ${mod ? styles[`button--${mod}`] : ''} ${styles[`button--${size}`]}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
