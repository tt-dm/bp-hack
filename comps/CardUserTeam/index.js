import React from 'react';
import { useMutation } from '@apollo/client';

import { CrossDel } from 'Components/icons';
import { actions } from 'Lib/store';
import { useDispatch, useSelector } from 'Components/Ctx';
import UPDATE_TEAM from 'Lake/updateTeam.graphql';


export const CardUserTeam = ({
    firstName,
    lastName,
    idTeammate,
    idTeam,
}) => {
    const dp = useDispatch();
    const directusTeammates = useSelector('game.directus_users');
    const [upTeam] = useMutation(UPDATE_TEAM);

    return (
        <div className='bg-white mb-3 me-3 d-flex align-items-center justify-content-between p-4' style={{ width: '74%', height: '100px', overflow: 'hidden', borderRadius: '8px', border: '1px solid #5450FF' }}>
            <div
                className=''
                style={{
                    fontFamily: 'Roboto',
                    fontSize: 22,
                    fontWeight: 500,
                }}
            >
                {`${lastName} ${firstName}`}
            </div>
            <div
                className='bg-white d-flex align-items-center justify-content-center ps-2'
                style={{
                    cursor: 'pointer',
                }}
                onClick={async () => {
                    dp(actions.game.removeTeammates({ id: idTeammate }));
                    await upTeam({
                        variables: {
                            id: idTeam,
                            directus_users: directusTeammates.filter(item => item !== { id: idTeammate }),
                        },
                    });
                }}
            >
                <CrossDel />
                <div />
            </div>
        </div>
    );
};
