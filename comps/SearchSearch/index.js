import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { SearchIc } from 'Components/icons';
import { useDispatch, useSelector } from 'Components/Ctx';
import { store as main_store } from 'Lib/store/main';

import styles from './styles.module.scss';


export const Search = () => {
    const { push } = useRouter();
    const dp = useDispatch();

    const searchDataField = useSelector('main.filters.search');

    const setSearch = data => {
        dp(main_store.actions.setFilters(data));
    };

    const { register, handleSubmit, getValues, watch } = useForm({
        defaultValues: {
            search: searchDataField,
        },
    });

    useEffect(() => setSearch(getValues()), [watch('search')]);

    const searchHandler = async () => {
        await push('/profile?tab=team');
    };

    return (
        <form onSubmit={handleSubmit(searchHandler)}>
            <div className={clsx(styles.search, 'd-flex justify-content-between align-items-center w-50')}>
                <input className={clsx(styles.search_field, 'w-100')} placeholder='Введите название команды...' {...register('search')} />
                <div
                    className='pb-1'
                    onClick={async () => {
                        await push('/catalog/all');
                    }}
                >
                    <SearchIc />
                </div>
            </div>
        </form>
    );
};
