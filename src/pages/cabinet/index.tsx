import React, { useEffect } from 'react';
import { NextPageWithLayout } from '@/interfaces/layout';
import { MainLayout } from '@/components/layout';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useRouter } from 'next/router';
import { getLocalStorageValue } from '@/utils/getLocalStorageValue';
import { LOG_KEY } from '@/static/storageKeys';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { TabPanel } from '@/components/forms/Panel';
import PatientInfo from '@/components/personal-cabinet/PersonalInfo';
import { StyledButton } from '@/components/styled-button';
import { style } from '@/components/navigation/auth-navigation';
import AppointmentForm from '@/components/forms/AppointmentForm';
import Modal from '@mui/material/Modal';


const Cabinet: NextPageWithLayout = () => {
    const isLoggedIn = JSON.parse(getLocalStorageValue(LOG_KEY) ?? '');

    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        if (!isLoggedIn && router.isReady) {
            router.replace('/home');
        }
    }, [isLoggedIn, router]);
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Box id='hero'
                 sx={{ backgroundColor: 'background.paper', position: 'relative', pt: 4, pb: { xs: 8, md: 10 } }}>
                <Container maxWidth='lg'>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <StyledButton disableHoverEffect={false} onClick={() => setOpen(true)}>Записатись на
                            прийом
                        </StyledButton>
                    </Box>
                    <Tabs value={value} onChange={handleChange} aria-label='icon tabs example'>
                        <Tab icon={<PersonPinIcon />} iconPosition='end' label={'Персональна інформація'} />
                        <Tab icon={<HistoryOutlinedIcon />} iconPosition='end' label={'Історія відвідувань'} />
                        <Tab icon={<TimerOutlinedIcon />} iconPosition='end' label={'Майбутні відвідування'} />

                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <PatientInfo />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        2
                    </TabPanel>
                </Container>
            </Box>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={style}>
                    <AppointmentForm setOpenModal={setOpen} />
                </Box>
            </Modal>
        </React.Fragment>
    );
};

Cabinet.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default Cabinet;