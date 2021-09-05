import clsx from 'clsx';
import React from 'react';

import { Typography } from '../Typography';


export const Button = ({
    variant = '',
    htmlType = 'button',
    onClick = null,
    radius = '10',
    textType = 'p1sb',
    classNames = '',
    color = 'white',
    injection = false,
    disabled = false,
    outline = false,
    children,
}) => (
    <button
        onClick={onClick}
        className={clsx('btn text-center py-2 d-flex justify-content-center',
            `btn-${(disabled ? 'gren' : outline ? `outline-${variant}` : variant)}`,
            `brdr-${injection ? '' : radius}`,
            classNames)}
        disabled={disabled}
        type={htmlType === 'button' ? 'button' : 'submit'}
    >
        <Typography type={textType} classNames={clsx('text-center')} color={color}>
            {children}
        </Typography>
    </button>
);
