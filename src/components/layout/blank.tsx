import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface Props {
    children: ReactNode;
}

const BlankLayout = ({ children }: Props) => {
    return (
        <Box>
            {children}
        </Box>
    );
};

export default BlankLayout;
