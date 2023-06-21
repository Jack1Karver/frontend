import { ReactElement } from 'react';

import styles from 'src/components/input/error-message/scss/error-message.module.scss';

type ErrorMessageProps = {
  error: string;
};

export default function ErrorMessage({ error }: ErrorMessageProps): ReactElement {
  return <span className={styles['error-message']}>{error}</span>;
}
