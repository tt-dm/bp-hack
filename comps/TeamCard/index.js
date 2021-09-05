import React from 'react';
import { useMutation } from '@apollo/client';

import { CrossTeam } from 'Components/icons';
import { actions } from 'Lib/store';
import { types } from 'Components/Modal';
import { useDispatch, useSelector } from 'Components/Ctx';
import CREATE_REQUEST from 'Lib/apollo/schemas/createRuquest.graphql';


export const TeamCard = ({
    name,
    Uio,
}) => {
    const dp = useDispatch();
    const zxc = useSelector('game.id');
    console.log(zxc);
    const [req] = useMutation(CREATE_REQUEST);

    return (
        <div className='bg-white mb-3 me-3 d-flex align-items-center justify-content-between p-4' style={{ width: '44%', height: '100px', overflow: 'hidden', borderRadius: '8px', border: '1px solid #5450FF' }}>
            <div
                className=''
                style={{
                    fontFamily: 'Roboto',
                    fontSize: 42,
                    fontWeight: 500,
                }}
            >
                {name}
            </div>
            <div
                className='bg-white d-flex align-items-center justify-content-center'
                style={{
                    background: '#FFFFFF',
                    border: '1px solid #5450FF',
                    width: '4em',
                    height: '4em',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    dp(actions.main.showModal({
                        type: types.Popup,
                        message: (
                            <div className='vw-100 d-flex align-content-center justify-content-center'>
                                <div className='w-25 rounded bg-white shadow-lg p-4'>
                                    <div className='h2'>
                                        Отправить заявку в
                                        {' '}
                                        {name}
                                        ?
                                    </div>
                                    <div className='d-flex justify-content-end mt-4'>
                                        <button
                                            type='button'
                                            className='btn btn-outline-primary mx-1'
                                            onClick={() => dp(actions.main.hideModal())}
                                        >
                                            Отмена
                                        </button>

                                        <button
                                            type='button'
                                            className='btn btn-primary '
                                            onClick={async () => {
                                                dp(actions.main.hideModal());
                                                await req({
                                                    variables: {
                                                        id: Uio,
                                                    },
                                                });
                                            }}
                                        >
                                            Отправить
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ),
                    }));
                }}
            >
                <CrossTeam />
                <div />
            </div>
        </div>
    );
};
