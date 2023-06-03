import React, { useState } from 'react';
import { Button, FormControl, FormLabel, InputAdornment } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

interface SignInFormProps {
    onSubmit: (data: SignInFormData) => void;
}

interface SignInFormData {
    phone: string;
    password: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<SignInFormData>({
        phone: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box display={'flex'} flexDirection={'column'} gap={'20px'} mb={'20px'}>
                <FormControl>
                    <>
                        <FormLabel>Номер телефону</FormLabel>
                        <InputBase
                            sx={{
                                backgroundColor: 'background.paper',
                                borderRadius: 3,
                                width: '100%',
                                height: 48,
                                px: 2,
                                mr: { xs: 0, md: 3 },
                                mb: { xs: 2, md: 0 },
                                border: '1px solid black',
                            }} name='phone'
                            type='phone'
                            placeholder='+38 XXX-XXX-XX-XX'
                            value={formData.phone}
                            onChange={handleChange}
                            required />
                    </>
                </FormControl>
                <FormControl>
                    <>
                        <FormLabel>Пароль</FormLabel>
                        <InputBase
                            sx={{
                                backgroundColor: 'background.paper',
                                borderRadius: 3,
                                width: '100%',
                                height: 48,
                                px: 2,
                                mr: { xs: 0, md: 3 },
                                mb: { xs: 2, md: 0 },
                                border: '1px solid black',
                            }} name='password'
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            required />
                    </>
                </FormControl>
            </Box>
            <Box display={'flex'}>
                <Button type='submit' variant='contained' color='primary' sx={{ flex: 'auto' }}>
                    Увійти
                </Button>
            </Box>
        </form>
    );
};

export default SignInForm;
