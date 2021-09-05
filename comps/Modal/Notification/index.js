import { motion, useAnimation } from 'framer-motion';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { TransitionsModal } from 'Lib/transitions/modal';

import styles from './s.module.scss';
import { ArrowDown, Cross } from '../../icons';
import { useDispatch, useSelector } from '../../Ctx';
import { Typography } from '../../Typography';
import { store as main_store } from '../../../lib/store/main';


const rightIcon = (dp, controls, dc) => {
    const insider = useAnimation();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(async () => {
        await dc.start(TransitionsModal.hideDescription);
        await insider.start(TransitionsModal.rotate);
        setIsOpen(false);
    }, []);

    return ({
        'notification/SuccessNotification': (
            <div onClick={async () => {
                await controls.start(TransitionsModal.hide);
                dp(main_store.actions.hideModal());
            }}
            >
                <Cross color='wht' />
            </div>
        ),
        'notification/NotificationWithDesc': (
            <motion.div
                animate={insider}
                onClick={async () => {
                    if (isOpen) {
                        await dc.start(TransitionsModal.hideDescription);
                        await insider.start(TransitionsModal.rotate);
                        setIsOpen(false);
                    } else {
                        await dc.start(TransitionsModal.openDescription);
                        await insider.start(TransitionsModal.initialRotate);
                        setIsOpen(true);
                    }
                // dp(main_store.actions.hideModal())
                }}
            >
                <ArrowDown color='wht' />
            </motion.div>
        ),
    });
};

export const Notification = ({ children }) => {
    const { message, icon, type, background } = useSelector('main.modal');
    const dp = useDispatch();
    const controls = useAnimation();
    const descriptionControls = useAnimation();

    // eslint-disable-next-line consistent-return
    useEffect(async () => {
        await controls.start(TransitionsModal.stable);
        if (type === 'notification/SuccessNotification') {
            const timer = setTimeout(async () => {
                await controls.start(TransitionsModal.exit);
                dp(main_store.actions.hideModal());
            }, 3500);
            return () => clearInterval(timer);
        }
    }, []);

    return (
        <motion.div className={clsx('position-fixed bottom-0 w-100', styles.wrapper)}>
            <motion.div
                animate={controls}
                initial={TransitionsModal.initial}
                transition={TransitionsModal.transition}
                className={children && 'rounded sh-lg_down m-3 overflow-hidden'}
            >
                <motion.div
                    className={clsx(
                        `bg-${background} d-flex align-items-center justify-content-between p-2`,
                        children || 'rounded sh-lg_down m-3',
                    )}
                >
                    <div>
                        {icon}
                    </div>
                    <Typography classNames='w-100 mx-2' color='wht' type='p2sb'>
                        {message}
                    </Typography>
                    {rightIcon(dp, controls, descriptionControls)[type]}
                </motion.div>
                <motion.div animate={descriptionControls}>
                    {children}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
