import React, { useEffect, useRef, useState } from 'react';

import styles from './scss/select.module.scss';

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

type SelectProps = {
  placeholder: string;
  options: string[] | number[];
  onSelect: (value: string | number) => void;
  onClear?: () => void;
  title?: string;
  selected?: string | number;
  bg?: 'dark' | 'light';
};

const Select = ({ placeholder, options, onSelect, title, selected, bg = 'light', onClear }: SelectProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(selected ?? null);

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    selected && setSelectedValue(selected);
    const handler = (e: any) => {
      //@ts-ignore
      if (inputRef.current && !inputRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const onItemClick = (option: string | number) => {
    setSelectedValue(option);
    onSelect(option);
  };

  const clear = () => {
    if (onClear) {
      onClear();
    }
    setSelectedValue(null);
  };

  return (
    <>
      {title ? <h5>{title}</h5> : ''}
      <div className={styles.select__container}>
        <div ref={inputRef} className={styles.select__input} onClick={handleInputClick}>
          {selectedValue ?? placeholder}
          {showMenu && (
            <div className={`${styles.select__menu} ${styles[`select__menu--${bg}`]}`}>
              <div className={styles.select__item} onClick={clear}>
                Clear
              </div>
              {options.map(option => {
                return (
                  <div key={option} className={styles.select__item} onClick={() => onItemClick(option)}>
                    {option}
                  </div>
                );
              })}
            </div>
          )}
          <Icon />
        </div>
      </div>
    </>
  );
};

export default Select;
