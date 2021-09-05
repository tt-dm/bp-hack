import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import { useDispatch, useSelector } from 'Components/Ctx';
import { actions } from 'Lib/store';
import { types } from 'Components/Modal';
import { Plus } from 'Components/icons';
import { Search } from 'Components/SearchSearch';
import GET_ALL_TEAMS from 'Lib/apollo/schemas/getAllTeams.graphql';
import { TeamCard } from 'Components/TeamCard';
import GET_TEAM_BY_ID_USER from 'Lib/apollo/schemas/getTeamByIdUser.graphql';
import USER_ME from 'Lake/system/userMe.graphql';
import { CardUserTeam } from 'Components/CardUserTeam';
import { CardDelUserTeam } from 'Components/CardDelUserTeam';


export const Teams = () => {
    const [isCommand] = useState(false);
    const [numButton, setNumButton] = useState(-1);
    const client = useSelector('main.client');
    const dp = useDispatch();
    const [teambyid, { data: dataTeam, loading: loadingTeam }] = useLazyQuery(GET_TEAM_BY_ID_USER);
    const { data } = useQuery(USER_ME, {
        errorPolicy: 'ignore',
        client,
    });

    useEffect(async () => {
        if (data) {
            await teambyid({
                variables: {
                    id: data?.users_me.id,
                },
            });
            dp(actions.profile.id(data?.users_me.id));
        }
    }, [data]);
    useEffect(async () => {
        if (dataTeam && !loadingTeam) {
            // eslint-disable-next-line array-callback-return
            dataTeam.teams[0].directus_users.map((key, index) => {
                dp(actions.game.directusUsers({ id: dataTeam.teams[0].directus_users[index].id }));
            });
        }
    }, [dataTeam, loadingTeam]);


    useEffect(() => {
        // s
    }, [numButton]);

    const filters = useSelector('main.filters');

    const {
        data: searchTeams,
        loading: loadingAllTeams,
        refetch,
    } = useQuery(GET_ALL_TEAMS, {
        variables: {
            ...filters,
        },
    });

    useEffect(async () => {
        await refetch();
    }, [filters]);


    const invite = () => {
        dp(actions.main.showModal({
            type: types.Popup,
            message: (
                <div className='vw-100 d-flex align-content-center justify-content-center'>
                    <div className='w-25 rounded bg-white shadow-lg p-4'>
                        <div className='h2'>
                            Добавить участника
                        </div>
                        <div className=''>
                            <input
                                className='form-control form-control-lg rounded-0'
                                type='email'
                                placeholder='E-mail'
                            />
                        </div>
                        <div>
                            <div className='w-100 d-flex align-items-center justify-content-between'>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src='https://admin-hack.techno-team.ru/assets/2575ba09-d237-4fbc-b2a0-db3f47d566f1?width=50&height=50'
                                    width={50}
                                    height={50}
                                    alt='avatar'
                                />
                                <div className='m-2'>
                                    <div className='m-2'>
                                        Имя Фамилия
                                    </div>
                                    <div className='m-2'>
                                        example@ex.com
                                    </div>
                                </div>
                                <button type='button' className='m-2 rounded-0 btn btn-outline-primary'>
                                    Пригласть
                                </button>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button
                                    type='button'
                                    className='btn btn-outline-primary'
                                    onClick={() => dp(actions.main.hideModal())}
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        }));
    };
    const create = () => {
        dp(actions.main.showModal({
            type: types.Popup,
            message: (
                <div className='vw-100 d-flex align-content-center justify-content-center'>
                    <div className='w-25 rounded bg-white shadow-lg p-4'>
                        <div className='h2'>
                            Создать команду
                        </div>
                        <div className=''>
                            <input
                                className='form-control form-control-lg rounded-0'
                                type='email'
                                placeholder='Название'
                            />
                        </div>
                        <div className='d-flex justify-content-end mt-2'>
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
                                onClick={() => dp(actions.main.hideModal())}
                            >
                                Готово
                            </button>
                        </div>
                    </div>
                </div>
            ),
        }));
    };

    // useEffect(invite, []);

    return (
        <>
            {isCommand ? (
                <div className='w-100'>
                    <div className='bg-primary d-inline-flex p-3 h3 text-white'>
                        Название команды
                    </div>
                    <div className='row mt-3'>
                        <div className='col-4 bg-white d-flex'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className='m-3'
                                src='https://admin-hack.techno-team.ru/assets/2575ba09-d237-4fbc-b2a0-db3f47d566f1?width=200&height=200'
                                alt='avatar'
                            />
                            <div className='mx-3 my-3'>
                                <div className='h5'>
                                    Имя Фамилия
                                </div>
                                <div className='text-primary h6'>
                                    example@example.com
                                </div>
                            </div>
                            <div
                                onClick={invite}
                                className='d-flex flex-column justify-content-center align-content-center col'
                            >
                                <div>
                                    <Plus />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='container' style={{ overflow: 'auto' }}>
                    <div className='row'>
                        <button
                            className='col-3 m-3 btn btn-outline-primary'
                            type='button'
                            onClick={create}
                        >
                            Создать команду
                        </button>
                        <button
                            className='col-3 m-3 btn btn-primary'
                            type='button'
                        >
                            Поиск команды
                        </button>
                        <button
                            className='col-3 m-3 btn btn-outline-primary'
                            type='button'
                            onClick={() => {
                                setNumButton(2);
                                dp(actions.main.showModal({
                                    type: types.Popup,
                                    message: (
                                        <div className='vw-100 d-flex justify-content-center'>
                                            <div className='w-75 rounded bg-white shadow-lg p-4'>
                                                <div className='container pt-5 pb-2'>
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <div className='h2'>
                                                                Команда:
                                                                {' '}
                                                                {dataTeam ? dataTeam?.teams[0]?.name : '' }
                                                            </div>
                                                            <div className=''>
                                                                {dataTeam ? dataTeam.teams[0].directus_users.map(key => (
                                                                    <>
                                                                        <CardUserTeam lastName={key.last_name} firstName={key.first_name} idTeam={dataTeam?.teams[0]?.id} idTeammate={key.id} />
                                                                    </>
                                                                )) : 'у вас ещё нет команды '}
                                                            </div>
                                                        </div>
                                                        <div className='col'>
                                                            <div className='h2'>
                                                                Заявки
                                                            </div>
                                                            <div>
                                                                {dataTeam ? dataTeam.teams[0].requests.map(key => (
                                                                    <>
                                                                        <CardDelUserTeam idTeam={dataTeam?.teams[0]?.id} lastName={key.user_created.last_name} firstName={key.user_created.first_name} idTeammate={key.user_created.id} />
                                                                    </>
                                                                )) : 'у вас ещё нет команды '}
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-end'>
                                                            <button
                                                                type='button'
                                                                className='btn btn-outline-primary'
                                                                onClick={() => dp(actions.main.hideModal())}
                                                            >
                                                                Закрыть
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                }));
                            }}
                        >
                            Моя команда
                        </button>
                    </div>
                </div>
            )}
            <div style={{ overflow: 'auto' }}>
                <div className='ps-3 pt-4'>
                    <Search />
                </div>
                <div style={{ overflow: 'auto', maxHeight: '68vh' }}>
                    {!loadingAllTeams && searchTeams
                        ?.teams?.map(key => (
                            <div
                                className='mt-4 ps-3'
                                onClick={async () => {
                                    await dp(actions.game.id(key.id));
                                }}
                            >
                                <TeamCard name={key.name} Uio={key.id} />
                            </div>
                        ))}
                </div>
            </div>

        </>
    );
};
