import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RegistrationForm from '@/components/forms/RegistrationForm';
import SignInForm from '@/components/forms/SignInForm';
import { LOG_KEY } from '@/static/storageKeys';

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

    const onSubmit = (data: any) => {
        if (data) {
            setLoggedIn(true)
            setOpenModal(false)
            localStorage.setItem(LOG_KEY, JSON.stringify(true));
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
                <SignInForm onSubmit={onSubmit} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <RegistrationForm onSubmit={onSubmit} />
            </TabPanel>
        </Box>
    );

};

export default Panel;