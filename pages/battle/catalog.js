import React from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { MainSidebar } from 'Components/wrappers/MainSidebar';
import { GET_CATALOG, GET_CATALOG_ENEMY } from 'Lake/getCatalog.graphql';
import USER_ME from 'Lake/system/userMe.graphql';
import { useSelector } from 'Components/Ctx';
import { BIcon } from 'Components/icons';


const Catalog = () => {
    const { push } = useRouter();
    const client = useSelector('main.client');
    const [get, {
        data,
        loading,
        called,
    }] = useLazyQuery(GET_CATALOG);

    const [getA, {
        data: dataA,
        loading: loadingA,
    }] = useLazyQuery(GET_CATALOG_ENEMY);

    useQuery(USER_ME, {
        client,
        onCompleted: async info => {
            await getA({
                variables: {
                    id: info.users_me?.participants?.id,
                },
            });
            await get({
                variables: {
                    id: info.users_me?.participants?.id,
                },
            });
        },
    });

    return (
        <MainSidebar>
            {called && !loading && !loadingA ? (
                <div className='w-100 row h-50'>
                    {data.battle.map((p, idx) => (
                        <div
                            className='border rounded border-primary col-4 d-flex text-center flex-column h5 p-3'
                            key={String(idx)}
                        >
                            Командный бой
                            {`  ${idx}`}
                            <div className='w-50'>
                                <BIcon />
                            </div>
                            Успешно заверши
                            {' '}
                            {p.card_rate}
                            {' '}
                            карточек
                            <div className='h6'>
                                В начале стражения карточки сбалансированно распределяются между
                                участниками
                            </div>
                            <div className='btn btn-outline-primary w-50 align-self-center mt-3'>
                                +
                                {p.card_rate}
                                {' '}
                                баллов
                            </div>
                            <div
                                className='btn btn-primary w-50 align-self-center mt-3'
                                onClick={() => push(`/battle/${p.id}`)}
                            >
                                Принять вызов
                            </div>
                        </div>
                    ))}
                    {dataA.battle.map((p, idx) => (
                        <div
                            className='border rounded border-primary col-4 d-flex text-center flex-column h5 p-3'
                            key={String(idx)}
                        >
                            Командный бой
                            {`  ${idx}`}
                            <div className='w-50'>
                                <BIcon />
                            </div>
                            Успешно заверши
                            {' '}
                            {p.card_rate}
                            {' '}
                            карточек
                            <div className='h6'>
                                В начале стражения карточки сбалансированно распределяются между
                                участниками
                            </div>
                            <div className='btn btn-outline-primary w-50 align-self-center mt-3'>
                                +
                                {p.card_rate}
                                {' '}
                                баллов
                            </div>
                            <div
                                className='btn btn-primary w-50 align-self-center mt-3'
                                onClick={() => push(`/battle/${p.id}?a=true`)}
                            >
                                Принять вызов
                            </div>
                        </div>
                    ))}
                </div>
            ) : ''}
        </MainSidebar>
    );
};


export default Catalog;
