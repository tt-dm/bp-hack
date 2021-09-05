import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.scss';


interface Itypo {
    type: 'p5sb'
    | 'p5'
    | 'p4'
    | 'p3sb'
    | 'p3'
    | 'p2'
    | 'p2sb'
    | 'p1'
    | 'p1sb'
    | 't2'
    | 't1sb'
    | 't1'
    | 't0'
    color?: string
    classNames?: string
}


export const Typography: React.FC<Itypo> = ({
    children,
    classNames,
    color = 'blck',
    type = 'p3',
}) => (
    <div className={clsx(styles[type], `text-${color}`, classNames)}>
        {children}
    </div>
);
