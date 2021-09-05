import fp from 'lodash/fp';

import { actions } from './actions';


export const init_state = {
    id: null,
    directus_users: [],
};

export const reducer = {
    [`${actions.id}`]: (state, payload) => fp.merge(
        state,
        {
            id: payload,
        },
    ),

    [`${actions.directusUsers}`]: (state, payload) => fp.merge(
        state,
        {
            directus_users: [...state.directus_users, payload],
        },
    ),

    [`${actions.removeTeammates}`]: (state, payload) => ({
        ...state,
        directus_users: fp.remove(n => payload === n.id, state.directus_users),
    }),

};
