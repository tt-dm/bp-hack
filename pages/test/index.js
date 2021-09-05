import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';


import AUTH from 'Lake/system/auth.graphql';
import { createSystemApolloClient } from 'Lib/apollo';


const client = createSystemApolloClient();

const Test = () => {
    const [auth, { data, loading }] = useMutation(AUTH, {
        client,
    });

    useEffect(async () => {
        await auth({
            variables: {
                email: 'system@techno-team.ru',
                pass: 'admin-hack',
            },
        });
    }, []);

    return (
        <>
            {loading || JSON.stringify(data)}
        </>
    );
};

export default Test;
