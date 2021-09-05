import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { MainSidebar } from 'Components/wrappers/MainSidebar';


const Home = () => {
    const { push } = useRouter();

    useEffect(() => push('/battle/catalog'), []);
    // const { data, loading } = useQuery(GET_CARDS);
    return (
        <MainSidebar>
            <>
            </>
        </MainSidebar>
    );
};

export default Home;
