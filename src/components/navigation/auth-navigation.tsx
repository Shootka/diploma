import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import { StyledButton } from '@/components/styled-button';
import Modal from '@mui/material/Modal';
import { getLocalStorageValue } from '@/utils/getLocalStorageValue';
import { LOG_KEY } from '@/static/storageKeys';
import IconButton from '@mui/material/IconButton';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useRouter } from 'next/router';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import dynamic from 'next/dynamic';

const DynamicPanel = dynamic(() => import('@/components/forms/Panel'), { ssr: false });
const DynamicAppointmentForm = dynamic(() => import('@/components/forms/AppointmentForm'), { ssr: false });

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    mixWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const AuthNavigation: FC = () => {
    const [open, setOpen] = React.useState(false);
    const [formId, setFormId] = useState(1);

    const handleOpen = (id: number) => {
        setFormId(id);
        setOpen(true);
    };
    const router = useRouter();
    const handleClose = () => setOpen(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(getLocalStorageValue(LOG_KEY)));
    console.log(isLoggedIn);
    console.log(typeof isLoggedIn);
    const handleProfileClick = () => {
        router.push('/cabinet');
    };

    const handleLogoutClick = () => {
        router.push('/home');
        localStorage.setItem(LOG_KEY, JSON.stringify(false));
        setIsLoggedIn(false);
    };
    return (
        <React.Fragment>
            <Box>
                {isLoggedIn &&
                    <>
                        <IconButton onClick={handleProfileClick}>
                            <PersonOutlineOutlinedIcon color={'primary'} />
                        </IconButton>
                        <IconButton onClick={handleLogoutClick}>
                            <LogoutOutlinedIcon color={'primary'} />
                        </IconButton>
                    </>
                }
                {!isLoggedIn &&
                    <>
                        <StyledButton disableHoverEffect={false} variant='outlined' onClick={() => handleOpen(1)}>
                            Увійти до кабінету
                        </StyledButton>
                        <StyledButton disableHoverEffect={false} onClick={() => handleOpen(2)}>Записатись на
                            прийом</StyledButton>
                    </>
                }
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    {formId === 1 && <DynamicPanel setOpenModal={setOpen} setLoggedIn={setIsLoggedIn} />}
                    {formId === 2 && <DynamicAppointmentForm setOpenModal={setOpen} />}
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default AuthNavigation;
