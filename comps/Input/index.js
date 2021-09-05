import clsx from 'clsx';
import React, { useState } from 'react';
import { useController } from 'react-hook-form';

import styles from './style.module.scss';


export const Input = ({
    children = '',
    name,
    control,
    icon,
    disabled = false,
    placeholder,
    type = 'text',
}) => {
    const { field } = useController({ control, name, defaultValue: '' });

    const [isActive, setIsActive] = useState(false);
    const [state, setState] = useState(type === 'password');

    return (
        <div className={clsx(styles.txtinput)}>
            <div className='d-flex flex-column'>
                <div style={{ fontFamily: 'Roboto', fontSize: 18, fontWeight: 400 }}>
                    {children}
                </div>
                <div
                    onClick={() => setIsActive(true)}
                    className={clsx(
                        ' border-bottom d-flex align-items-center justify-content-between',
                        isActive && 'border-vio',
                    )}
                >
                    <input
                        {...field}
                        type={state === false ? 'text' : 'password'}
                        placeholder={placeholder}
                        onBlur={() => setIsActive(false)}
                        disabled={disabled}
                        className={clsx(styles.input, 'd-flex w-100 shadow-none py-3 brdr-2 ps-3')}
                    />
                    {icon && (
                        <div className='border-start border-1 p-1'>
                            {icon}
                        </div>
                    )}
                    <div
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: 18,
                            fontWeight: 400,
                            color: '#FEBF60',
                            cursor: 'pointer',
                        }}
                        onClick={() => setState(!state)}
                    >
                        {type === 'password' ? 'Показать' : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};
