import React from 'react';
import theme from '@/config/theme';
import Document, { Html, Head, Main, NextScript } from 'next/document';

interface DocumentProps {
    emotionStylesTags: any[];
}

class MyDocument extends Document<DocumentProps> {
    render(): any {
        return (
            <Html lang='en'>
                <Head>
                    <meta charSet='utf-8' />
                    <link rel='icon' href='/favicon.ico' />
                    <meta name='viewport' content='initial-scale=1, width=device-width' />
                    <meta name='theme-color' content={theme.palette.background.paper} />

                    <meta content='#fbfbfb' name='theme-color' />
                    <meta content='#fbfbfb' name='msapplication-navbutton-color' />
                    <meta content='#fbfbfb' name='apple-mobile-web-app-status-bar-style' />
                    <meta content='yes' name='apple-mobile-web-app-capable' />

                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,700;1,500;1,700&display=swap'
                        rel='stylesheet'
                    />
                    {/* Inject MUI styles first to match with the prepend: true configuration. */}
                    {this.props.emotionStylesTags}
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}
export default MyDocument;
