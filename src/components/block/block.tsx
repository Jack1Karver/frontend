import React, { ReactNode } from 'react';


import styles from 'src/components/block/scss/block.module.scss';
import Container from '../container/container';

type BlockPropTypes = {
  children: ReactNode;
  bg: 'light' | 'dark' | 'brand' | 'purple' | 'blue' | string;
  borders?: boolean;
  slider?: boolean;
  className?: string;
  containerMod?: 'sm' | 'flex' | 'md' | 'lg';
  modifier?: 'tabs' | 'border-bottom' | 'tabs-linear';
  zIndex?: number;
  first?: boolean;
  paddings?: 'pt-0' | 'pb-sm' | 'p-0' | 'pb-0';
  id?: string;
};

export default function Block(props: BlockPropTypes): JSX.Element {
  return (
    <section
      className={`${styles.block} ${styles['block--' + props.bg]} ${props.borders ? styles['block--bordered'] : ''} ${
        props.paddings ? styles['block--' + props.paddings] : ''
      } ${props.className ? styles[props.className] : ''}  ${
        props.modifier ? styles[`block--${props.modifier}`] : ''
      } ${props.first ? styles['block--first'] : ''}`}
      style={{ zIndex: props.zIndex }}
      id={props.id}
    >
      <Container mobWide={props.slider} mod={props.containerMod}>
        {props.children}
      </Container>
    </section>
  );
}
