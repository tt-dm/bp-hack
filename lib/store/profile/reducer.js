import fp from 'lodash/fp';

import { actions } from './actions';


export const init_state = {
    id: null,
    token: null,
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    status: '',
    balance: '',
    phone: '',
};

export const reducer = {
    [actions.auth]: (state, token) => ({
        ...state,
        token,
    }),
    [`${actions.id}`]: (state, payload) => fp.merge(
        state,
        {
            id: payload,
        },
    ),
    [actions.addProfileInfo]: (state, payload) => fp.merge(
        state,
        payload,
    ),
};
