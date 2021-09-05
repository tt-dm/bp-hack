import { create_action_namespace } from '../utils';


const game = create_action_namespace('game');

export const actions = {
    id: game('ID'),
    directusUsers: game('DIRECTUS_USERS'),
    removeTeammates: game('REMOVE_TEAMMATES'),
};
