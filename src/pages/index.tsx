import React, { useEffect } from 'react';
import { NextPageWithLayout } from '@/interfaces/layout';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/layout/blank';
import CircularProgress from '@mui/material/CircularProgress';
const Home: NextPageWithLayout = () => {
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) {
            return;
        } else router.push('/home');
    }, [router]);

    return (<CircularProgress />);
};

Home.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
export default Home;
