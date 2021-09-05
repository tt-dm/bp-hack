import React from 'react';
import clsx from 'clsx';

import { store as main_store } from 'Lib/store/main';
import { types } from 'Components/Modal';
import { useDispatch } from 'Components/Ctx';

import styles from '../WheelFortune/styles.module.scss';


export const CookieFortune = () => {
    const dp = useDispatch();
    return (
        <div>
            <div
                color='orng'
                onClick={() => dp(main_store.actions.showModal({
                    type: types.Popup,
                    addition: {
                        description:
    <>
        <div
            className='vw-100 vh-100 d-flex justify-content-center align-items-center'
            style={{
                background: 'rgba(19, 15, 66, 0.6)',
                backdropFilter: 'blur(2px)',
            }}
        >
            <div className='d-flex flex-column justify-content-center bg-white brdr-6 px-3 pt-5' style={{ color: 'black', borderRadius: '6px' }}>
                <img className='me-auto ms-auto mb-3' alt='cookeries' style={{ maxWidth: '17em', maxHeight: '17em' }} src='/opencook.png' />
                <div
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: 20,
                        fontWeight: 400,
                    }}
                >
                    Если хотите иметь успех, вы должны выглядеть так, как будто вы его имеете.
                </div>
                <div
                    className='d-flex w-100 justify-content-end'
                    onClick={() => {
                        dp(main_store.actions.hideModal());
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <div
                        className='pt-4 pb-4 pe-3'
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: 32,
                            fontWeight: 400,
                            color: 'orange',
                        }}
                    >
                        OK
                    </div>
                </div>
            </div>
        </div>
    </>,
                    },
                }))}
            >
                <img className={clsx(styles.cookie_anime)} alt='cookeries' style={{ maxWidth: '2em', maxHeight: '2em' }} src='/closecook.png' />
            </div>
        </div>
    );
};
