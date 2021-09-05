import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';

import { useDispatch, useSelector } from '../../../Ctx';
import { Button } from '../../../Button';
import { store as main_store } from '../../../../lib/store/main';


export const ErrorDescription = () => {
    const { push } = useRouter();

    const dp = useDispatch();

    const { description, link, btn_text } = useSelector('main.modal.addition');

    return (
        <motion.div className='d-flex bg-wht p-2 flex-column'>
            {description}
            {btn_text && (
                <Button
                    onClick={async () => {
                        dp(main_store.actions.hideModal());
                        await push(link);
                    }}
                    variant='orng'
                    classNames='mt-1'
                >
                    {btn_text}
                </Button>
            )}
        </motion.div>
    );
};
