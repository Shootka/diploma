import React, { FC, useEffect } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from '@/utils';
import { MUIProvider } from '@/providers';
import 'slick-carousel/slick/slick.css';
import '@/styles/globals.css';
import '@/styles/react-slick.css';
import { NextPageWithLayout } from '@/interfaces/layout';
import dynamic from "next/dynamic";
import { MainLayout } from '@/components/layout';
const clientSideEmotionCache = createEmotionCache();

type AppPropsWithLayout = AppProps & {
    emotionCache: EmotionCache
    Component: NextPageWithLayout
}

const App: FC<AppPropsWithLayout> = (props: AppPropsWithLayout) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

    useEffect(() => {
        // Удаляем стили, добавленные сервером, для предотвращения ошибки гидрации
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (
        <StyledEngineProvider injectFirst>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name='viewport' content='initial-scale=1, width=device-width' />
                    <title>Оксфорд Медікал</title>
                </Head>
                <MUIProvider>
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                </MUIProvider>
            </CacheProvider>
        </StyledEngineProvider>

    );
};
export default dynamic(() => Promise.resolve(App), {
    ssr: false,
});
