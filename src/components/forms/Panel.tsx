import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RegistrationForm from '@/components/forms/RegistrationForm';
import SignInForm from '@/components/forms/SignInForm';
import { LOG_KEY, TOKEN } from '@/static/storageKeys';
import { register } from '@/query/registration';
import toast from 'react-hot-toast';
import { login } from '@/query/login';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box pt={2}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface Props {
    setLoggedIn: (val: boolean) => void;
    setOpenModal: (val: boolean) => void;
}

const Panel = ({ setLoggedIn, setOpenModal }: Props) => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const onSubmitLogin = (data: any) => {
        if (data) {
            if (data) {
                login(data).then(res => {
                    if (res) {
                        localStorage.setItem(TOKEN, JSON.stringify(res?.accessToken));
                        localStorage.setItem(LOG_KEY, JSON.stringify(true));
                        toast.success('Авторизація пройшла успішно!');
                        setLoggedIn(true);
                        setOpenModal(false);
                    }
                });
            }
        }
    };
    const onSubmitRegistration = (data: any) => {
        if (data) {
            register(data).then(res => {
                if (res) {
                    localStorage.setItem(TOKEN, JSON.stringify(res?.accessToken));
                    localStorage.setItem(LOG_KEY, JSON.stringify(true));
                    toast.success('Реєстрація пройшла успішно!');
                    setLoggedIn(true);
                    setOpenModal(false);
                }
            });
        }
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'
                  sx={{ '& .MuiTabs-flexContainer': { justifyContent: 'center' } }}>
                < Tab label='Увійти' {...a11yProps(0)} />
                <Tab label='Зареєструватись' {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <SignInForm onSubmit={onSubmitLogin} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <RegistrationForm onSubmit={onSubmitRegistration} />
            </TabPanel>
        </Box>
    );

};

export default Panel;