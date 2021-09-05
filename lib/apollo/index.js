import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react';
import { isEqual, merge } from 'lodash';

import { urls } from 'Lib/consts';


// const httpLink = ;

// export const httpSystemLink = createHttpLink({
//     uri: 'https://adm_gh.techno-team.ru/graphql/system',
// });

export const authLink = token => setContext((_, { headers }) => ({
    headers: {
        ...headers,
        authorization: token && `Bearer ${token}`,
    },
}));

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

export const createApolloClient = token => new ApolloClient({
    link: (authLink(token)).concat(createHttpLink({
        uri: urls.gql,
    })),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    // events: relayStylePagination(),
                },
            },
        },
    }),
});


export const createSystemApolloClient = token => new ApolloClient({
    link: (authLink(token)).concat(createHttpLink({
        uri: urls.system,
    })),
    cache: new InMemoryCache(),
});


export function initializeApollo(initialState = null, token = null) {
    const _apolloClient = apolloClient ?? createApolloClient(token);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter(d =>
                    sourceArray.every(s => !isEqual(d, s))),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined')
        return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient)
        apolloClient = _apolloClient;

    return _apolloClient;
}

export function addApolloState(client, pageProps) {
    if (pageProps?.props)
        // eslint-disable-next-line no-param-reassign
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();


    return pageProps;
}

export function useApollo(pageProps, token) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    return useMemo(() => initializeApollo(state, token), [state]);
}
