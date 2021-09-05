import { store as main_store } from './main/index';
import { store as profile } from './profile/index';
import { store as game } from './game/index';


export const actions = {
    [`${main_store.namespace}`]: main_store.actions,
    [`${profile.namespace}`]: profile.actions,
    [`${game.namespace}`]: game.actions,
};

export const init_state = {
    [`${main_store.namespace}`]: main_store.init_state,
    [`${profile.namespace}`]: profile.init_state,
    [`${game.namespace}`]: game.init_state,
};


export const reducer = (state, action) => {
    const namespace = action.type.split('/')[0];
    const r = {
        ...main_store.reducer,
        ...profile.reducer,
        ...game.reducer,
    };
    return {
        ...state,
        [`${namespace}`]: r[action.type](state[namespace], action.$payload),
    };
};
