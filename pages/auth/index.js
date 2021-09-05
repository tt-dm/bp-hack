import React from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import AUTH from 'Lake/system/auth.graphql';
import { createSystemApolloClient } from 'Lib/apollo';
import { Input } from 'Components/Input';
import { Button } from 'Components/Button';
import { Circle, Gear, Gear2, Logo } from 'Components/icons';
import { useDispatch } from 'Components/Ctx';
import { useCookie } from 'Lib/hooks/useCookie';
import { actions } from 'Lib/store';

import styles from '../../styles/auth.module.scss';


const Auth = () => {
    const dp = useDispatch();
    const client = createSystemApolloClient();
    const cookie = useCookie();
    const { push } = useRouter();
    const [auth] = useMutation(AUTH, {
        client,
        onCompleted: async data => {
            dp(actions.profile.auth(data.auth_login.access_token));

            await cookie.set('access_token', data.auth_login.access_token, {
                maxAge: 60 * 60 * 71,
            });
            await localStorage.setItem('refresh_token', data.auth_login.refresh_token);
            window.location.href = '/';
        },
    });

    const [authCheck] = useMutation(AUTH, {
        client,
        onCompleted: async data => {
            dp(actions.profile.auth(data.auth_login.access_token));
            cookie.set('access_token', data.auth_login.access_token, {
                maxAge: 60 * 60 * 71,
            });
            localStorage.setItem('refresh_token', data.auth_login.resfresh_token);
            window.location.href = '/profile';
        },
    });

    const { handleSubmit, control } = useForm({
        defaultValues: {
            email: '',
            password: '',
            status: '',
        },
    });

    const authHandler = async data => {
        await auth({
            variables: {
                ...data,
            },
        });
        await authCheck({
            variables: {
                ...data,
            },
        });
    };

    // useEffect(async () => {
    //     await auth({
    //         variables: {
    //             email: 'system@techno-team.ru',
    //             pass: 'admin-hack',
    //         },
    //     });
    // }, []);

    return (
        <>
            <div className={styles.bg_main}>
                <div className='d-flex justify-content-center align-items-center vh-100 position-relative'>
                    <div className='position-absolute' style={{ top: '-10%', right: '34%' }}>
                        <div className={clsx(styles.ft1)}>
                            <Gear />
                        </div>
                        <div className={clsx(styles.ft2)}>
                            <Gear2 />
                        </div>
                        <div className={clsx(styles.circle, 'position-absolute')}>
                            <Circle />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(authHandler)}>
                        <div className={clsx(styles.auth_card, 'd-flex flex-column justify-content-center align-items-center position-relative')}>
                            <div
                                className='mb-5'
                                style={{
                                    fontFamily: 'Roboto',
                                    fontSize: 32,
                                    fontWeight: 600,
                                }}
                            >
                                <Logo />
                            </div>
                            <div className='w-100 mx-2'>
                                <div className='mx-5'>
                                    <div className='w-100 mb-4'>
                                        <Input
                                            type='text'
                                            className='form-control'
                                            id='email'
                                            name='email'
                                            control={control}
                                            placeholder='Введите почту'
                                        />
                                    </div>
                                    <div className='mb-0'>
                                        <Input
                                            type='text'
                                            className='form-control m-0'
                                            id='password'
                                            name='password'
                                            control={control}
                                            placeholder='Введите пароль'
                                        />
                                    </div>
                                    <div
                                        className='d-flex justify-content-end mt-2'
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '18px',
                                            color: '#9623F0',
                                            fontWeidth: 400,
                                            marginRight: 'auto',
                                        }}
                                    >
                                        Забыли пароль?
                                    </div>
                                </div>
                                <Button variant='danger' classNames='mt-0 px-5 mt-lg-3 mt-xl-3 mt-xxl-3 d-flex ms-auto me-auto' htmlType='submit' radius={3}>
                                    <div
                                        className='d-flex ms-auto me-auto px-4 py-3'
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '36px',
                                            color: '#FFFFFF',
                                            fontWeidth: 500,
                                        }}
                                    >
                                        Войти
                                    </div>
                                </Button>

                                <div className='d-flex flex-column justify-content-center mt-3 ms-auto me-auto'>
                                    <div
                                        className='d-flex ms-auto me-auto'
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '18px',
                                            color: '#1E1E1E',
                                            fontWeidth: 400,
                                            marginRight: 'auto',
                                        }}
                                    >
                                        Ещё нет аккаунта?
                                    </div>
                                    <div
                                        className='ms-auto me-auto d-flex'
                                        style={{
                                            fontFamily: 'Roboto',
                                            fontSize: '18px',
                                            color: '#9623F0',
                                            cursor: 'pointer',
                                            fontWeidth: 400,
                                            marginRight: 'auto',
                                        }}
                                        onClick={async () => {
                                            await push('/auth/reg');
                                        }}
                                    >
                                        Зарегистрироваться
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Auth;
