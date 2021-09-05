import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import fp from 'lodash/fp';

import { MainSidebar } from 'Components/wrappers/MainSidebar';
import GET_BATTLE_BY_ID from 'Lake/getBattleById.graphql';
import { urls } from 'Lib/consts';


const counter = (e, o, r, c) => fp.pipe(
    () => [e + o, r],
    fp.max,
    res => c / res * 100,
    res => res.toFixed(2),
)();


const Battle = () => {
    const { query: { id, a }, push } = useRouter();
    const { data, loading, error } = useQuery(GET_BATTLE_BY_ID, {
        pollInterval: 5000,
        variables: {
            id,
        },
    });

    let battleInfo = data?.battle_by_id;

    if (a && !loading) {
        battleInfo = {
            ...battleInfo,
            score: battleInfo.enemy_score,
            enemy_score: battleInfo.score,
            enemy: battleInfo.user_created.participants,
            user_created: {
                participants: battleInfo.enemy,
            },
        };
    }

    return (
        <MainSidebar>
            {!error && !loading ? (
                <div className='me-4 vw-100'>
                    <div className='d-flex flex-column justify-content-center w-100'>
                        <div className='h1 w-100 text-center'>
                            Сражение
                        </div>
                        <div className='row'>
                            <div className='h2 col-4'>
                                {battleInfo.user_created.participants.name}
                                <div className='mt-3 bg-primary rounded-3 p-3'>
                                    {battleInfo
                                        .user_created
                                        .participants
                                        .directus_users.map((s, idx) => (
                                            <div className='bg-white d-flex m-3' key={String(idx)}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    className='m-3'
                                                    src={`${urls.assets}${s?.avatar?.id}?width=70&height=70`}
                                                    alt='avatar'
                                                />
                                                <div className='mx-3 my-3'>
                                                    <div className='h5'>
                                                        {`${s.first_name} ${s.last_name}`}
                                                    </div>
                                                    <div className='text-primary h6'>
                                                        {s.email}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    <div className='m-3 fw-light text-white h5'>
                                        <div>
                                            Скорость
                                        </div>
                                        <div>
                                            Правильность
                                        </div>
                                        <div>
                                            Карточки
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4'>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <div className='border rounded border-primary p-4'>
                                    {battleInfo.task}
                                </div>
                                <div className='text-center mt-5 h3'>
                                    {battleInfo.user_created.participants.name}
                                    {' & '}
                                    {battleInfo.enemy.name}
                                </div>
                                <div
                                    style={{
                                        height: '50px',
                                    }}
                                    className='progress rounded-0 my-3'
                                >
                                    <div
                                        className='progress-bar'
                                        role='progressbar'
                                        style={{ width: `${counter(battleInfo.enemy_score, battleInfo.score, battleInfo.card_rate, battleInfo.score)}%` }}
                                    >
                                        {`${counter(battleInfo.enemy_score, battleInfo.score, battleInfo.card_rate, battleInfo.score)}%`}
                                    </div>
                                    <div
                                        className='progress-bar bg-warning'
                                        role='progressbar'
                                        style={{
                                            width: `${Math.max((battleInfo
                                                .card_rate - battleInfo
                                                .enemy_score - battleInfo
                                                .score) / battleInfo
                                                .card_rate * 100, 0)}%`,
                                        }}
                                    >
                                        {Math.round(Math.max((battleInfo
                                            .card_rate - battleInfo
                                            .enemy_score - battleInfo
                                            .score) / battleInfo
                                            .card_rate * 100, 0))}
                                        %
                                    </div>
                                    <div
                                        className='progress-bar bg-danger'
                                        role='progressbar'
                                        style={{
                                            width: `${counter(battleInfo
                                                .enemy_score, battleInfo
                                                .score, battleInfo
                                                .card_rate, battleInfo
                                                .enemy_score)}%`,
                                        }}
                                    >
                                        {`${counter(battleInfo
                                            .enemy_score, battleInfo
                                            .score, battleInfo
                                            .card_rate, battleInfo
                                            .enemy_score)}%`}
                                    </div>
                                </div>
                                <div
                                    className='mt-5 text-center flex-column d-inline-flex align-items-center justify-content-center w-100'
                                >
                                    <button type='button' className='btn btn-outline-primary h4' onClick={() => push(`/battle/card?bp=${id}&a=${a}`)}>
                                        Перейти к выполнению
                                    </button>
                                    <button type='button' className='btn btn-danger h4'>
                                        Закончить
                                    </button>
                                </div>
                            </div>
                            <div className='h2 col-4'>
                                {battleInfo.enemy.name}
                                <div className='mt-3 bg-danger rounded-3 p-3'>
                                    {battleInfo.enemy.directus_users.map((s, idx) => (
                                        <div className='bg-white d-flex m-3' key={String(idx)}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className='m-3'
                                                src={`${urls.assets}${s?.avatar?.id}?width=70&height=70`}
                                                alt='avatar'
                                            />
                                            <div className='mx-3 my-3'>
                                                <div className='h5'>
                                                    {`${s.first_name} ${s.last_name}`}
                                                </div>
                                                <div className='text-primary h6'>
                                                    {s.email}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='m-3 fw-light text-white h5'>
                                        <div>
                                            Скорость
                                        </div>
                                        <div>
                                            Правильность
                                        </div>
                                        <div>
                                            Карточки
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : ''}
        </MainSidebar>
    );
};

export default Battle;
