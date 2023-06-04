import React, { useState } from 'react';
import { Button, FormControl, FormLabel, TextField } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { register } from '@/query/registration';

interface RegistrationFormProps {
    onSubmit: (data: SubmitData) => void;
}

interface RegistrationFormData {
    firstName: string;
    lastName: string;
    patronym: string;
    phone: string;
    email: string;
    birthDate: string;
    password: string;
    check_pass: string;
}

export interface SubmitData {
    firstName: string;
    lastName: string;
    patronym: string;
    phone: string;
    email: string;
    birthDate: string;
    password: string;
}

export const RowBox = styled(Box)({
    display: 'flex',
    gap: '10px',
});
const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<RegistrationFormData>({
        firstName: '',
        patronym: '',
        lastName: '',
        phone: '',
        email: '',
        birthDate: '',
        password: '',
        check_pass: '',
    });
    const [isValid, setIsValid] = useState(true);

    const validatePhoneNumber = () => {
        const phoneRegex = /^380\d{9}$/;
        setIsValid(phoneRegex.test(formData.phone));
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const { lastName, firstName, patronym, password, email, birthDate, phone } = formData;
        if (formData.password === formData.check_pass) {
            onSubmit({ lastName, firstName, patronym, password, email, birthDate, phone });
        }
        console.log(formData);

    };
    console.log(isValid);
    return (
        <form onSubmit={handleSubmit}>
            <Box display={'flex'} flexDirection={'column'} gap={'20px'} mb={'20px'} width={650}>

                <FormControl>
                    <FormLabel>Прізвище</FormLabel>
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
                        }} name='lastName'
                        placeholder='Прізвище (введіть українською, як у посвідченні особи)'
                        value={formData.lastName}
                        onChange={handleChange}
                        required />
                </FormControl>
                <FormControl>
                    <FormLabel>{`Ім'я`}</FormLabel>
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
                        }} name='firstName'
                        placeholder={'Ім\'я (введіть українською, як у посвідченні особи)'}
                        value={formData.firstName}
                        onChange={handleChange}
                        required />
                </FormControl>
                <FormControl>
                    <FormLabel>По батькові</FormLabel>
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
                        }} name='patronym'
                        placeholder='По батькові (введіть українською, як у посвідченні особи)'
                        value={formData.patronym}
                        onChange={handleChange}
                        required />
                </FormControl>
                <RowBox>
                    <FormControl>
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
                            type={'text'}
                            placeholder='+38 XXX-XXX-XX-XX'
                            value={formData.phone}
                            onBlur={validatePhoneNumber}
                            error={!isValid}
                            onChange={handleChange}
                            required />
                        {!isValid && <p>Помилка </p>}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Електронна пошта</FormLabel>
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
                            }} name='email'
                            type='email'
                            placeholder='E-mail'
                            value={formData.email}
                            onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Дата народження</FormLabel>
                        <InputBase
                            type='date'
                            name={'birthDate'}
                            placeholder={'Дата народження'}
                            value={formData.birthDate}
                            sx={{
                                backgroundColor: 'background.paper',
                                borderRadius: 3,
                                width: '100%',
                                height: 48,
                                px: 2,
                                mr: { xs: 0, md: 3 },
                                mb: { xs: 2, md: 0 },
                                border: '1px solid black',
                            }}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </FormControl>
                </RowBox>
                <FormControl>
                    <FormLabel>Придумайте пароль</FormLabel>
                    <InputBase
                        type='password'
                        name={'password'}
                        placeholder={''}
                        value={formData.password}
                        sx={{
                            backgroundColor: 'background.paper',
                            borderRadius: 3,
                            width: '100%',
                            height: 48,
                            px: 2,
                            mr: { xs: 0, md: 3 },
                            mb: { xs: 2, md: 0 },
                            border: '1px solid black',
                        }}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Підтвердіть пароль</FormLabel>
                    <InputBase
                        type='password'
                        name={'check_pass'}
                        placeholder={''}
                        value={formData.check_pass}
                        sx={{
                            backgroundColor: 'background.paper',
                            borderRadius: 3,
                            width: '100%',
                            height: 48,
                            px: 2,
                            mr: { xs: 0, md: 3 },
                            mb: { xs: 2, md: 0 },
                            border: '1px solid black',
                        }}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </FormControl>
            </Box>
            <Box display={'flex'}>
                <Button type='submit' variant='contained' color='primary' sx={{ flex: 'auto' }}>
                    Зареєструватись
                </Button>
            </Box>
        </form>
    );
};

export default RegistrationForm;
