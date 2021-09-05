import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';

import { useOnClickOutside } from 'Lib/hooks/useOnClickOutside';

import { useDispatch, useSelector } from '../../Ctx';
import { store as main_store } from '../../../lib/store/main';
import styles from '../styles.module.scss';
import { Typography } from '../../Typography';


export const Popup = () => {
    const dp = useDispatch();

    const { message, addition } = useSelector('main.modal');

    const closer = () => dp(main_store.actions.hideModal());

    const outRef = useRef(null);

    useOnClickOutside(outRef, closer);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            ref={outRef}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={clsx('position-fixed vw-100 vh-100 bg-mbck d-flex justify-content-center',
                styles.m_back)}
        >
            <motion.div
                ref={outRef}
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                exit={{ y: 80 }}
                transition={{ duration: 0.3 }}
                onDragEnd={(_, i) => i.offset.y > 60 && closer()}
                dragConstraints={{ bottom: 50, top: 0 }}
                className={clsx('bg-wht mx-4 d-flex flex-column justify-content-center', styles.m_gen)}
            >
                <Typography type='t1' classNames='px-2 justify-content-center'>
                    {message}
                </Typography>
                <Typography type='p3' classNames='my-1 px-2'>
                    {addition.description}
                </Typography>
                <Link href={addition.link}>
                    <a href={addition.link} onClick={() => closer()} className='text-end text-orng px-2'>
                        {addition.btn_text}
                    </a>
                </Link>
            </motion.div>
        </motion.div>
    );
};
