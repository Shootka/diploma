import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

interface PatientInfoProps {
    fullName: string;
    phoneNumber: string;
    email: string;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ fullName, phoneNumber, email }) => {
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
                        <strong>ФІО:</strong> {fullName}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='body1'>
                        <strong>Номер телефону:</strong> {phoneNumber}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body1'>
                        <strong>Пошта:</strong> {email}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PatientInfo;
