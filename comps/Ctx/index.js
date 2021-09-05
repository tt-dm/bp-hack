import React, { useContext, useMemo, useReducer } from 'react';
import { ApolloProvider } from '@apollo/client';
import fp from 'lodash/fp';

import { createSystemApolloClient, useApollo } from 'Lib/apollo';
import { init_state, reducer } from 'Lib/store';


// noinspection JSCheckFunctionSignatures
const Ctx = React.createContext(undefined, undefined);


export const useSelector = path => fp.get(path, useContext(Ctx).state);

export const useDispatch = () => useContext(Ctx).dp;

export const useData = () => useContext(Ctx);

const clientCreator = token => createSystemApolloClient(token);

export const Provider = ({
    children,
    props,
    ext,
}) => {
    const client = useApollo(props, ext.profile.token);

    const systemClient = useMemo(() =>
        clientCreator(ext.profile.token),
    [clientCreator, ext]);

    const withSystemClient = fp.merge(ext, { main: { client: systemClient } });

    const [state, dp] = useReducer(reducer, fp.merge(init_state, withSystemClient));

    return (
        <Ctx.Provider value={{
            state,
            dp,
        }}
        >
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
        </Ctx.Provider>
    );
};
