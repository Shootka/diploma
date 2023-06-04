import React, { useState } from 'react';
import { Typography, Grid, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import DoctorAppointmentForm from '@/components/forms/DoctorAppointmentForm';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format, getDay, isBefore, startOfToday } from 'date-fns';

setDefaultLocale('ru');

interface Doctor {
    id: number;
    name: string;
}

interface AppointmentFormData {
    selectedDoctor: number;
    appointmentDate: string | any;
}

interface Props {
    setOpenModal: (val: boolean) => void;
}

const AppointmentForm = ({ setOpenModal }: Props) => {
    const [selectedDoctor, setSelectedDoctor] = useState<number>(-1);
    const [selectedHelp, setSelectedHelp] = useState<number>(-1);
    const [appointmentDate, setAppointmentDate] = useState<any>(null);
    const [isSelected, setIsSelected] = useState(false);
    const doctors: Doctor[] = [
        { id: 1, name: 'Доктор 1' },
        { id: 2, name: 'Доктор 2' },
        { id: 3, name: 'Доктор 3' },
    ];
    const typeOfHelp = [
        { id: 1, name: 'Дантист' },
        { id: 2, name: 'Хірург' },
        { id: 3, name: 'Педіатр' },
    ];
    const excludedDates = ['2023-06-01', '2023-06-05', '2023-06-10'];

    const isExcludedDate = (date: any) => {
        const formattedDate = format(date, 'yyyy-MM-dd');

        if (excludedDates.includes(formattedDate)) {
            return false;
        }
        const today = startOfToday();
        const dayOfWeek = getDay(date);
        return !isBefore(date, today) && ![0, 6].includes(dayOfWeek);
    };
    const handleDateChange = (date: any) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:00`;
    };
    const [formDate, setFormData] = useState<AppointmentFormData>({
        selectedDoctor: 0,
        appointmentDate: '',
    });
    const handleDoctorChange = (event: SelectChangeEvent<number>) => {
        setSelectedDoctor(event.target.value as number);
    };
    const handleHelpChange = (event: SelectChangeEvent<number>) => {
        setSelectedHelp(event.target.value as number);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: AppointmentFormData = {
            selectedDoctor,
            appointmentDate: handleDateChange(appointmentDate),
        };
        setFormData(data);
        setIsSelected(true);
        console.log('Дані форми:', data);
    };
    const availableTime = [];
    const currentDate = new Date().toISOString().split('T')[0];
    return (
        <>
            <Typography variant='h6' component='h1' gutterBottom>
                Форма запису до лікаря
            </Typography>
            {!isSelected && <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Select
                            id='type-select'
                            value={selectedHelp}
                            onChange={handleHelpChange}
                            fullWidth
                            input={<InputBase sx={{
                                backgroundColor: 'background.paper',
                                borderRadius: 3,
                                width: '100%',
                                height: 48,
                                px: 2,
                                mr: { xs: 0, md: 3 },
                                mb: { xs: 2, md: 0 },
                                border: '1px solid black',
                            }} />}
                            required
                        >
                            <MenuItem value={-1} disabled>
                                Виберіть направлення
                            </MenuItem>
                            {typeOfHelp.map((doctor) => (
                                <MenuItem key={doctor.id} value={doctor.id}>
                                    {doctor.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            id='doctor-select'
                            value={selectedDoctor}
                            onChange={handleDoctorChange}
                            fullWidth
                            input={<InputBase sx={{
                                backgroundColor: 'background.paper',
                                borderRadius: 3,
                                width: '100%',
                                height: 48,
                                px: 2,
                                mr: { xs: 0, md: 3 },
                                mb: { xs: 2, md: 0 },
                                border: '1px solid black',
                            }} />}
                            required
                        >
                            <MenuItem value={-1} disabled>
                                Виберіть доктора
                            </MenuItem>
                            {doctors.map((doctor) => (
                                <MenuItem key={doctor.id} value={doctor.id}>
                                    {doctor.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker
                            customInput={
                                <InputBase
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <CalendarTodayIcon />
                                        </InputAdornment>
                                    }
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
                                />}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            dateFormat='yyyy-MM-dd HH:mm'
                            selected={appointmentDate}
                            onChange={(date) => setAppointmentDate(date)}
                            filterDate={isExcludedDate}
                            showWeekNumbers
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            input={
                                <InputBase sx={{
                                    backgroundColor: 'background.paper',
                                    borderRadius: 3,
                                    width: '100%',
                                    height: 48,
                                    px: 2,
                                    mr: { xs: 0, md: 3 },
                                    mb: { xs: 2, md: 0 },
                                    border: '1px solid black',
                                }} />
                            } />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained' color='primary'>
                            Записатися
                        </Button>
                    </Grid>
                </Grid>
            </form>}
            {isSelected &&
                <DoctorAppointmentForm setOpenModal={setOpenModal} appointmentDate={formDate.appointmentDate}
                                       doctorName={formDate.selectedDoctor} />}
        </>
    );
};

export default AppointmentForm;
