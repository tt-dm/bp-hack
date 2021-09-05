import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

import { MainSidebar } from 'Components/wrappers/MainSidebar';
import { Profile } from 'Components/Profile';
import { Teams } from 'Components/Teams';
import { Statistics } from 'Components/Statistics';

import styles from '../../styles/profile.module.scss';


const tabs = {
    id: {
        component: <Profile />,
        name: 'Профиль',
    },
    team: {
        component: <Teams />,
        name: 'Команда',
    },
    stats: {
        component: <Statistics />,
        name: 'Статистика',
    },
};

const ProfilePage = () => {
    const { query: { tab } } = useRouter();

    return (
        <MainSidebar>
            <div className='p-4 w-75'>
                <div className='w-100'>
                    {Object.keys(tabs).map(idx => (
                        <Link
                            href={`/profile?tab=${idx}`}
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
                <div className='mt-4 w-100 h-100'>
                    {tab && tabs[tab].component}
                </div>

            </div>

        </MainSidebar>
    );
};

export default ProfilePage;
