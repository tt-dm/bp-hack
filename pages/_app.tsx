import React from 'react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import moment from 'moment';

import '../styles/global.scss';
import { Modal } from 'Components/Modal';
import { useCookie } from 'Lib/hooks/useCookie';
import { Provider } from 'Components/Ctx';


moment.locale('ru');

type IAppProps = Partial<AppProps>& {
    cookie: string;
    host: string;
}


const MyApp = ({ Component, pageProps, cookie, host }: IAppProps) => {
    const cookies = useCookie(cookie, host);

    return (
        <>
            <Provider props={pageProps} ext={{ profile: { token: cookies.get('access_token') } }}>
                <Modal />
                {/* @ts-ignore */}
                <Component {...pageProps} />
            </Provider>
        </>
    );
};


MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);

    return {
        ...appProps,
        cookie: appContext?.ctx?.req?.headers?.cookie,
        host: appContext?.ctx?.req?.headers?.host?.split(':')[0],
    };
};
export default MyApp;
