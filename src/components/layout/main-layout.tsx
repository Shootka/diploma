import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Toaster } from 'react-hot-toast';

interface Props {
    children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
    return (
        <Box component='main'>
            <Header />
            {children}
            <Toaster position='top-right'
                     reverseOrder={true} />
            <Footer />
        </Box>
    );
};

export default MainLayout;
