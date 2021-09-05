import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { BigArrowRight } from 'Components/icons';
import { MainSidebar } from 'Components/wrappers/MainSidebar';
import { CardMerch } from 'Components/CardMerch';

import styles from '../../styles/auth.module.scss';


const tabs = {
    shop1: {
        name: 'Обычное',
    },
    shop2: {
        name: 'Движение звезд',
    },
    shop3: {
        name: 'Снежный хребет',
    },
};

const Auth = () => {
    const { query: { tab } } = useRouter();

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
            <MainSidebar>
                <div className=' w-100' style={{ marginRight: '3%' }}>
                    <div className='p-4 w-75 mt-5'>
                        <div className='w-100'>
                            {Object.keys(tabs).map(idx => (
                                <Link
                                    href={`/${idx}`}
                                    key={String(idx)}
                                >
                                    <a
                                        href={`/profile?tab=${idx}`}
                                        className={clsx('px-3 py-2 mx-2 h4',
                                            styles.tab,
                                            idx === tab ? 'bg-primary text-white' : 'bg-white text-primary')}
                                    >
                                        {tabs[idx].name}
                                    </a>
                                </Link>
                            ))}
                        </div>
                        <div className=' w-100 h-100'>
                            {tab && tabs[tab].component}
                        </div>
                    </div>
                    <div
                        className='ps-4'
                        style={{
                            color: '#DC3545',
                            fontFamily: 'Roboto',
                            fontWidth: '400',
                            fontSize: '26px',
                        }}
                    >
                        Исчезнет 31 декабря в 23:59
                    </div>

                    <div className={clsx(styles.panel_main, 'd-flex justify-content-center flex-wrap w-100')} style={{ height: '81vh', borderRadius: '4px', backgroundColor: '' }}>
                        <>
                            <div className='d-flex align-content-start flex-wrap py-5 px-4' style={{ overflow: 'hidden' }}>
                                <CardMerch img='/shapka.png' title='Шапка' desc='Уши будут в тепле' price='20000' />
                                <CardMerch img='/elka.png' title='Елка' desc='+200 в атмосферности' price='99990  ' />
                                <CardMerch img='/deer.png' title='Игрушка "Олень"' desc='Мягче мягкого' price='13990' />
                                <CardMerch img='/sani.png' title='Сани' desc='До работы с ветерком' price='90000' />
                                <CardMerch img='/sharf.png' title='Шарф' desc='И в холод и в стужу' price='1599' />
                                <div className='d-flex justify-content-end mt-5 ms-auto me-auto'>
                                    <div className='mt-4'>
                                        <BigArrowRight />
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>

                </div>
            </MainSidebar>
        </>
    );
};

export default Auth;
