import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import fp from 'lodash/fp';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import GET_CARD from 'Lake/getCard.graphql';
import UPDATE_CARD from 'Lake/updateCard.graphql';
import UPDATE_BATTLE from 'Lake/updateBattle.graphql';
import UPDATE_BATTLE_ENEMY from 'Lake/updateBattleEnemy.graphql';
import { MainSidebar } from 'Components/wrappers/MainSidebar';
import { urls } from 'Lib/consts';
import { actions } from 'Lib/store';
import { types } from 'Components/Modal';
import { useDispatch } from 'Components/Ctx';
import GET_BATTLE_BY_ID from 'Lake/getBattleById.graphql';


const doc_types = {
    inn: 'ИНН',
    passport: 'Паспорт',
    cadastral_plan: 'Кадастровый план',
};

const Card = () => {
    const dp = useDispatch();
    const { query: { bp, a }, back } = useRouter();

    const { data, loading, refetch } = useQuery(GET_CARD);
    const { data: stats } = useQuery(GET_BATTLE_BY_ID, {
        pollInterval: 5000,
        variables: {
            id: bp,
        },
    });
    const [updateCard] = useMutation(UPDATE_CARD);
    const [updatePass] = useMutation(UPDATE_BATTLE);
    const [updatePassEnemy] = useMutation(UPDATE_BATTLE_ENEMY);

    const card = fp.get('cards[0]', data);

    useEffect(async () => {
        if (fp.get('cards.length', data) < 1) {
            dp(actions.main.showModal({
                type: types.SuccessNotification,
                background: 'success',
                message: (
                    <div className='text-white'>
                        Очередь заданий исчерпана.
                    </div>
                ),
            }));
            await back();
        }
    }, [data, bp]);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            comment: '',
        },
    });

    const handleUpdate = async data => {
        await updateCard({
            variables: {
                ...data,
                id: card.id,
            },
        });
        if (a) {
            await updatePassEnemy({
                variables: {
                    id: bp,
                    score: stats.battle_by_id.enemy_score + 1,
                },
            });
        } else {
            await updatePass({
                variables: {
                    id: bp,
                    score: stats.battle_by_id.score + 1,
                },
            });
        }
        await reset();
        await refetch();
    };

    return (
        <MainSidebar>
            {!loading && fp.get('cards.length', data) > 0 && (
                <form
                    onSubmit={handleSubmit(handleUpdate)}
                    className='me-4 vw-100 h4 h-100 overflow-auto'
                >
                    <div className='m-5'>
                        <div>
                            Тип документа:
                            {doc_types[card.doc_type]}
                        </div>
                        <div>
                            Контактный номер:
                            {card.contact}
                        </div>
                        <div className='row mt-4'>
                            {card.raw.map((file, idx) => (
                                <a
                                    className='col-3'
                                    target='_blank'
                                    href={`${urls.assets}${file.directus_files_id.id}`}
                                    key={String(idx)}
                                    rel='noreferrer'
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`${urls.assets}${file.directus_files_id.id}?height=500`}
                                        alt='doc'
                                    />
                                    doc#
                                    {idx}
                                </a>
                            ))}
                        </div>
                        <div className='d-flex flex-column mt-5'>
                            <div>
                                <textarea
                                    {...register('comment')}
                                    className='form-control w-50'
                                    placeholder='Комментарий'
                                />
                            </div>
                            <div>
                                <button type='button' className='btn btn-danger mt-3'>
                                    Отклонить
                                </button>
                                <button type='submit' className='mx-2 btn btn-success mt-3'>
                                    Подтвердить
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </MainSidebar>
    );
};

export default Card;
