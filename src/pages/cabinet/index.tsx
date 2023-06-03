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

const Cabinet: NextPageWithLayout = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isLoggedIn = Boolean(getLocalStorageValue(LOG_KEY));
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box id='hero' sx={{ backgroundColor: 'background.paper', position: 'relative', pt: 4, pb: { xs: 8, md: 10 } }}>
            <Container maxWidth='lg'>
                <Tabs value={value} onChange={handleChange} aria-label='icon tabs example'>
                    <Tab icon={<PersonPinIcon />} iconPosition='end' label={'Персональна інформація'} />
                    <Tab icon={<HistoryOutlinedIcon />} iconPosition='end' label={'Історія відвідувань'} />
                    <Tab icon={<TimerOutlinedIcon />} iconPosition='end' label={'Майбутні відвідування'} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <PatientInfo email={'example@gmail.com'} fullName={'Андрій Сергійович'}
                                 phoneNumber={'+3809212312'} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    2
                </TabPanel>
            </Container>
        </Box>
    );
};

Cabinet.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default Cabinet;