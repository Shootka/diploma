import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import DoctorAppointmentForm from '@/components/forms/DoctorAppointmentForm';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format, getDay, isBefore, startOfToday } from 'date-fns';
import { DoctorSpeciality } from '@/components/enum/doctor-speciality.enum';
import { getDoctors } from '@/query/getDoctors';
import { getLocalStorageValue } from '@/utils/getLocalStorageValue';
import { TOKEN } from '@/static/storageKeys';
import { newAuth } from '@/query/new-auth';
import { newUknown } from '@/query/new-uknown';
import jwt_decode from 'jwt-decode';

setDefaultLocale('ru');

interface Doctor {
    id: number;
    initials: string;
}

interface UknownUserSubmitInfo {
    birthDate: string;
    email: string;
    firstName: string;
    lastName: string;
    patronym: string;
    phone: string;
}

interface AppointmentFormData {
    selectedDoctor: number;
    appointmentDate: string | any;
}

interface Props {
    setOpenModal: (val: boolean) => void;
}

type UserInfo = {
    firstName: string;
    lastName: string,
    patronym: string
    exp: number
    iat: number
    sub: string
    phone: string
    email: string
    birthDate: string
}
const AppointmentForm = ({ setOpenModal }: Props) => {
    const [selectedDoctor, setSelectedDoctor] = useState<number>(-1);
    const [selectedHelp, setSelectedHelp] = useState('net');
    const [appointmentDate, setAppointmentDate] = useState<any>(null);
    const [isSelected, setIsSelected] = useState(false);
    const token = JSON.parse(getLocalStorageValue(TOKEN) ?? '');
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const typeOfHelp = [
        { id: DoctorSpeciality.DENTIST, name: 'Cтоматологія' },
        { id: DoctorSpeciality.DERMATOLOGIST, name: 'Дерматологія' },
        { id: DoctorSpeciality.ONCOLOGIST, name: 'Онкологія' },
        { id: DoctorSpeciality.OPHTHALMOLOGIST, name: 'Офтальмологія' },
        { id: DoctorSpeciality.SURGEON, name: 'Хірургія' },
        { id: DoctorSpeciality.NEUROLOGIST, name: 'Нейрологія' },
        { id: DoctorSpeciality.OTOLARYNGOLOGIST, name: 'Отоларингологія' },
    ];
    const excludedDates = ['2023-06-01', '2023-06-05', '2023-06-10'];
    useEffect(() => {
        if (selectedHelp !== 'net')
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        { // @ts-ignore
            getDoctors(selectedHelp).then(res => {
                console.log(res);
                setDoctorList(res);
            });
        }
    }, [selectedHelp]);
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
        setSelectedHelp(event.target.value as string);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const user: UserInfo | null = token ? jwt_decode(token) : null;
        console.log(token);
        console.log(user);
        event.preventDefault();
        const data: AppointmentFormData = {
            selectedDoctor,
            appointmentDate: handleDateChange(appointmentDate),
        };
        setFormData(data);
        const authData = {
            medicalDirection: selectedHelp,
            patientId: user?.sub,
            doctorId: selectedDoctor,
            visitDate: handleDateChange(appointmentDate),
        };
        if (user) {
            console.log(authData);
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            newAuth(authData);
        } else {
            setIsSelected(true);
        }
    };
    const submitUnauthorizedUser = (sbmtData: UknownUserSubmitInfo) => {
        console.log(sbmtData);
        const data = {
            medicalDirection: selectedHelp,
            doctorId: selectedDoctor,
            visitDate: handleDateChange(appointmentDate),
            ...sbmtData,
        };
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        newUknown(data);
    };
    const selectedDoctorName = doctorList.find((item) => item.id === selectedDoctor);

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
                            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                            // @ts-ignore
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
                            <MenuItem value={'net'} disabled>
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
                            {doctorList?.map((doctor) => (
                                <MenuItem key={doctor.id} value={doctor.id}>
                                    {doctor.initials}
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
                            minDate={today}
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
                        <Button type='submit' variant='contained' color='primary'>
                            Записатися
                        </Button>
                    </Grid>
                </Grid>
            </form>}
            {isSelected &&
                <DoctorAppointmentForm
                    onSubmit={submitUnauthorizedUser}
                    doctorId={formDate.selectedDoctor.toString()}
                    setOpenModal={setOpenModal}
                    appointmentDate={formDate.appointmentDate}
                    doctorName={selectedDoctorName?.initials ?? ''} />}
        </>
    );
};

export default AppointmentForm;
