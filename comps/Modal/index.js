import { AnimateSharedLayout } from 'framer-motion';
import React, { useEffect } from 'react';
// import { from, useApolloClient } from '@apollo/client';
// import { onError } from '@apollo/client/link/error';

import { create_action_namespace } from 'Lib/store/utils';
// import { actions } from 'Lib/store';

import { BottomFilter } from './BottomFilter';
import { useSelector } from '../Ctx';
import { store as main_store } from '../../lib/store/main';
import { Notification } from './Notification';
import { ErrorDescription } from './Additional/ErrorDescription';
import { Popup } from './Popup';


const modal = create_action_namespace('modal');
const notification = create_action_namespace('notification');

export const types = {
    BottomFilter: modal('BottomFilter').toString(),
    SuccessNotification: notification('SuccessNotification').toString(),
    NotificationWithDesc: notification('NotificationWithDesc').toString(),
    Popup: notification('Popup').toString(),
};

const comps = {
    [`${types.BottomFilter}`]: <BottomFilter />,
    [`${types.SuccessNotification}`]: <Notification />,
    [`${types.NotificationWithDesc}`]: <Notification><ErrorDescription /></Notification>,
    [`${types.Popup}`]: <Popup />,
};

export const Modal = () => {
    // const dp = useDispatch();

    // const apollo = useApolloClient();

    useEffect(() => {
        console.log('Error link init');
        // const errorLink = onError(() => {
        //     dp(actions.main.ex());
        //     console.log('abobus');
        // }, []);
        // apollo.setLink(from([
        //     apollo.link,
        //     errorLink,
        // ]));
    }, []);

    const om = useSelector(`${main_store.namespace}.modal.type`);

    return (
        <AnimateSharedLayout>
            {om && comps[om]}
        </AnimateSharedLayout>
    );
};
