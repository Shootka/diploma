import React, { FC, useState } from 'react';
import { InputBase, Checkbox, Button, FormControlLabel, FormLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import toast from 'react-hot-toast';

interface DoctorAppointmentFormProps {
    doctorName: number;
    appointmentDate: string;
    setOpenModal: (val: boolean) => void;
}

const StyledFormControl = styled(FormControl)({
    marginTop: '10px',
    width: '100%',
});
const DoctorAppointmentForm: FC<DoctorAppointmentFormProps> = ({
                                                                   doctorName,
                                                                   appointmentDate,
                                                                   setOpenModal,
                                                               }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        phone: '',
        email: '',
        address: '',
        complaints: '',
        consent: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Обработка отправки формы
        console.log(formData);
        toast.success(`Вас записано, до лікаря ${doctorName} на ${appointmentDate}`, { duration: 2500 });
        setOpenModal(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '600px' }}>
            <h2>Запись к врачу {doctorName}</h2>
            <p>Дата записи: {appointmentDate}</p>
            <Box display={'flex'} gap={'20px'}>
                <Box>
                    <StyledFormControl>
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
                            }}
                            name='lastName'
                            placeholder='Прізвище (введіть українською)'
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </StyledFormControl>
                    <StyledFormControl>
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
                            }}
                            name='firstName'
                            value={formData.firstName}
                            placeholder={'Ім\'я (введіть українською)'}
                            onChange={handleChange}
                            required
                        />
                    </StyledFormControl>

                    <StyledFormControl>
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
                            }}
                            name='patronymic'
                            placeholder='По батькові (введіть українською)'
                            value={formData.patronymic}
                            onChange={handleChange}
                            required
                        />
                    </StyledFormControl>
                </Box>
                <Box>
                    <StyledFormControl>
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
                            }}
                            name='phone'
                            placeholder='+38 XXX-XXX-XX-XX'
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </StyledFormControl>
                    <StyledFormControl>
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
                            }}
                            name='email'
                            placeholder='E-mail'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </StyledFormControl>
                    <StyledFormControl>
                        <FormLabel>Адреса</FormLabel>
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
                            }}
                            name='address'
                            placeholder='Адреса (Місто, вулиця, будинок, квартира)'
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </StyledFormControl>
                </Box>
            </Box>
            <StyledFormControl>
                <FormLabel>Ваші скарги</FormLabel>
                <InputBase
                    sx={{
                        backgroundColor: 'background.paper',
                        borderRadius: 3,
                        width: '100%',
                        height: 130,
                        px: 2,
                        mr: { xs: 0, md: 3 },
                        mb: { xs: 2, md: 0 },
                        border: '1px solid black',
                    }}
                    name='complaints'
                    value={formData.complaints}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
            </StyledFormControl>
            <StyledFormControl sx={{ mb: '10px' }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            name='consent'
                            checked={formData.consent}
                            onChange={handleChange}
                        />
                    }
                    label='Я хочу, щоб мені зателефонували для підтвердження'
                />
            </StyledFormControl>
            <Button type='submit' variant='contained' color='primary'>
                Записаться
            </Button>
        </form>
    );
};

export default DoctorAppointmentForm;
