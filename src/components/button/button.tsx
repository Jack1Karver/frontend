import { MouseEventHandler } from 'react';
import styles from './scss/styles.module.scss';

type ButtonProps = {
  mod?: 'blue' | 'grey' | 'empty';
  size?: 'wide' | 'md' | 'xs' | 'sm';
  content: string;
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
