import React from 'react';
import { useQuery } from '@apollo/client';

import USER_ME from 'Lake/system/userMe.graphql';
import { useSelector } from 'Components/Ctx';
import { urls } from 'Lib/consts';
import { useCookie } from 'Lib/hooks/useCookie';


// const mock = {
//     first_name: 'Имя',
//     last_name: 'Фамилия',
//     patronymic: 'Очество',
//     position: 'Название должности',
// };

export const Profile = () => {
    const client = useSelector('main.client');

    const { data, loading, error } = useQuery(USER_ME, {
        errorPolicy: 'ignore',
        client,
    });

    const cookie = useCookie();

    const logout = async () => {
        await cookie.remove('access_token');
        window.location.href = '/auth';
    };

    const user = data?.users_me || null;

    return (
        <div className='h-100 d-flex h5'>
            {loading || error ? (
                <div className='spinner-border text-primary' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            ) : (
                <>
                    <div className='w-50 h-75 d-flex flex-column justify-content-around'>
                        <div className='mx-5 mt-5 py-1 px-2 d-flex'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`${urls.assets}${user?.avatar?.id}`} width={200} alt='profile' />
                            <div className='align-self-end mx-2'>
                                <div className='px-2'>
                                    Должность
                                </div>
                                <div className='rounded px-3 py-2 bg-info'>
                                    {user.title}
                                </div>
                            </div>
                        </div>
                        <div className='mx-5 px-1'>
                            <div className='px-2'>
                                Прогресс печеньки
                            </div>
                            <div
                                className='progress'
                                style={{
                                    height: '20px',
                                }}
                            >
                                <div
                                    className='progress-bar'
                                    role='progressbar'
                                    style={{
                                        width: '55%',
                                    }}
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                >
                                    25%
                                </div>
                            </div>
                            <div className='px-2'>
                                Уровень колеса
                            </div>
                            <div
                                className='progress'
                                style={{
                                    height: '20px',
                                }}
                            >
                                <div
                                    className='progress-bar'
                                    role='progressbar'
                                    style={{
                                        width: '100%',
                                    }}
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                >
                                    1 lvl
                                </div>
                            </div>
                        </div>
                        <div className='my-1 mx-5 py-3 px-2'>
                            <div className='px-2'>
                                Имя
                            </div>
                            <div className='rounded px-3 py-2 bg-info'>
                                {user.first_name}
                            </div>
                        </div>
                        <div className='mx-5 py-3 px-2'>
                            <div className='px-2'>
                                Фамилия
                            </div>
                            <div className='rounded px-3 py-2 bg-info'>
                                {user.last_name}
                            </div>
                        </div>
                        <div className='mx-5 py-3 px-2'>
                            <div className='px-2'>
                                Отчество
                            </div>
                            <div className='rounded px-3 py-2 bg-info'>
                                {user.patronymic}
                            </div>
                        </div>
                        <div className='mx-5 py-3 px-2' style={{}}>
                            <div className='px-2'>
                                Почта
                            </div>
                            <div className='rounded px-3 py-2 bg-info'>
                                {user.email}
                            </div>
                        </div>
                        <div className=' mx-5 pt-4 px-2' style={{ color: 'red', cursor: 'pointer' }} onClick={() => logout()}>
                            Выйти
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

