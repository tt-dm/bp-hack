import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/order
import ReactTurntable from 'react-turntable';

import 'react-turntable/assets/index.css';
import clsx from 'clsx';

import { store as main_store } from 'Lib/store/main';
import { types } from 'Components/Modal';
import { useDispatch } from 'Components/Ctx';
import styleswh from 'Components/WheelFortune/styles.module.scss';


export const WheelFortune = () => {
    const dp = useDispatch();
    const styles = {
        justifyContent: 'center',
        alignContent: 'center',
        display: 'flex',
    };
    const prizes = [
        '100 баллов', '0 баллов', 'Свитшот',
        '2000 баллов', '700 баллов', '20000 баллов',
        'Шарф', '7000 баллов',
    ];
    const [prz, setPrz] = useState();

    const options = {
        prizes,
        width: 500,
        height: 500,
        primaryColor: '#FEBF60',
        secondaryColor: '#7B61FF',
        fontStyle: {
            color: '#fff',
            size: '14px',
            fontVertical: true,
            fontWeight: 'bold',
            fontFamily: 'Microsoft YaHei',
        },
        speed: 1000,
        duration: 5000,
        clickText: 'Начать',
        onStart() {
            console.log('start...');

            return true;
        },
        onComplete(prize) {
            console.log('prize:', prize);
            setPrz(prize);
        },
    };

    useEffect(() => {
        if (prz) {
            console.log('иди нахууууууууууууууууууууууууй', prz);
            dp(main_store.actions.hideModal());
            dp(main_store.actions.showModal({
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
            <div className='d-flex flex-column justify-content-center bg-white brdr-6 px-3 pt-5 mx-5 my-5' style={{ color: 'black', borderRadius: '6px', width: '30em', height: '10em' }}>
                <div
                    className='d-flex pb-2 text-nowrap'
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: 26,
                        fontWeight: 400,
                    }}
                >
                    Ваш приз:
                    <div
                        className='ps-2 text-nowrap'
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: 26,
                            fontWeight: 400,
                        }}
                    >
                        {prz}
                    </div>
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
            }));
        }
        // eslint-disable-next-line array-callback-return
    }, [prz]);

    const Demo = () => (
        <div style={styles}>
            <ReactTurntable {...options} />
        </div>
    );
    return (
        <>
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
                <Demo />
                <div
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: 20,
                        fontWeight: 400,
                    }}
                />
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
                    <img className={clsx(styleswh.wr)} alt='cookeries' style={{ maxWidth: '2em', maxHeight: '2em' }} src='/wf.png' />
                </div>
            </div>
        </>
    );
};
