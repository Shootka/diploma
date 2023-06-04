import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { getLocalStorageValue } from '@/utils/getLocalStorageValue';
import { TOKEN } from '@/static/storageKeys';
import jwt_decode from 'jwt-decode';

interface PatientInfo {
    firstName: string;
    lastName: string,
    patronym?: string
    exp: number
    iat: number
    sub: string
}

const PatientInfo: React.FC = () => {
    const token = JSON.parse(getLocalStorageValue(TOKEN) ?? '');
    const [user, setUser] = useState<PatientInfo>({
        exp: 0,
        firstName: '',
        iat: 0,
        lastName: '',
        patronym: '',
        sub: '',
    });
    useEffect(() => {
        setUser(jwt_decode(token));
    }, [token]);
    return (
        <Paper sx={{ pt: 2, boxShadow: 'none' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' component='h1'>
                        Інформація про пацієнта
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='body1'>
                        <strong>ФІО:</strong> {`${user.lastName ?? ''} ${user.firstName} ${user.patronym} `}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='body1'>
                        {/*<strong>Номер телефону:</strong> {phoneNumber}*/}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body1'>
                        {/*<strong>Пошта:</strong> {email}*/}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PatientInfo;
