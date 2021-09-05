import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { ArrowBack, ArrowTo, BStar, Shop, Star, User } from 'Components/icons';
import { CookieFortune } from 'Components/CookieFortune';
import { WheelFortune } from 'Components/WheelFortune';

import s from './s.module.scss';


const menu = [
    ['Профиль', '/profile?tab=id', <User />],
    ['Задания', '/battle/catalog', <BStar />],
    // ['Битва', '/battle'],
    ['Магазин', '/shop1', <Shop />],
];


export const MainSidebar = ({ children }) => {
    const [fluid, setFluid] = useState(true);
    const { asPath } = useRouter();
    return (
        <div className='p-5 vh-100'>
            <div className={clsx('h-100 d-flex w-100', s.rect)}>
                <div className={clsx('d-inline-flex flex-column ps-5 pt-3', s.menu)}>
                    <div className={clsx(s.menuItem, s.logoItem)}>
                        <Star />
                    </div>
                    {menu.map(([name, link, icon]) => (
                        <Link href={link} key={link}>
                            <a className={clsx('text-secondary h4 p-2', s.menuItem, asPath === link ? `text-white ${s.bg}` : 'text-black')}>
                                <div className='d-inline-flex align-items-center'>
                                    {icon}
                                    {'  '}
                                    {fluid && name}
                                </div>
                            </a>
                        </Link>
                    ))}
                    <div className={clsx(s.menuItem, 'd-flex flex-column')}>
                        <div className='my-1'>
                            <Star />
                        </div>
                        <div className='my-1'>
                            <Star />
                        </div>
                        <div className='my-1'>
                            <Star />
                        </div>
                        <div className='my-1'>
                            <Star />
                        </div>
                    </div>
                    <div className={clsx(s.menuItem, 'd-flex flex-column')}>
                        <div className='my-1'>
                            <WheelFortune />
                        </div>
                        <div className='my-1'>
                            <CookieFortune />
                        </div>
                    </div>
                    <button className={clsx('btn', s.menuItem, s.exitItem)} type='button' onClick={() => setFluid(s => !s)}>
                        {fluid ? <ArrowTo /> : <ArrowBack />}
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
