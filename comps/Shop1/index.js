import React from 'react';


export const Shop1 = () => (
    <div className='bg-white mb-3 me-3' style={{ width: '22vw', height: '13vw', overflow: 'hidden', borderRadius: '8px', border: '1px solid #5450FF' }}>
        <div className='container'>
            <div className='row'>
                <div className='col d-flex justify-content-center align-items-center'>
                    <img src='/head.png' alt='head' style={{ width: '171px', height: '192px' }} />
                </div>
                <div className='col pt-3 '>
                    <div className='d-flex flex-column align-content-between h-100'>
                        <div style={{
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontWeight: '900',
                            fontSize: '30px',
                        }}
                        >
                            Кепка
                        </div>
                        <div
                            className='pt-1'
                            style={{
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: '300',
                                fontSize: '14px',
                            }}
                        >
                            Благодаря этой кепке вы станете неотьемлемой частью команды
                        </div>
                    </div>
                    <div
                        className='d-flex py-1 justify-content-center'
                        style={{
                            background: '#FFFFFF',
                            border: '1px solid #5450FF',
                            boxSizing: 'border-box',
                            borderRadius: '20px',
                        }}
                    >
                        560 баллов
                    </div>
                </div>
            </div>
        </div>
    </div>
);
