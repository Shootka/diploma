import React, { useState } from 'react';
import { Typography, Grid, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import DoctorAppointmentForm from '@/components/forms/DoctorAppointmentForm';

interface Doctor {
    id: number;
    name: string;
}

interface AppointmentFormData {
    selectedDoctor: number;
    appointmentDate: string;
}

interface Props {
    setOpenModal: (val: boolean) => void;
}

const AppointmentForm = ({ setOpenModal }: Props) => {
    const [selectedDoctor, setSelectedDoctor] = useState<number>(-1);
    const [appointmentDate, setAppointmentDate] = useState<string>('');
    const [isSelected, setIsSelected] = useState(false);
    const doctors: Doctor[] = [
        { id: 1, name: 'Доктор 1' },
        { id: 2, name: 'Доктор 2' },
        { id: 3, name: 'Доктор 3' },
    ];
    const [formDate, setFormData] = useState<AppointmentFormData>({
        selectedDoctor: 0,
        appointmentDate: '',
    });
    const handleDoctorChange = (event: SelectChangeEvent<number>) => {
        setSelectedDoctor(event.target.value as number);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAppointmentDate(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: AppointmentFormData = {
            selectedDoctor,
            appointmentDate,
        };
        setFormData(data);
        setIsSelected(true);
        console.log('Дані форми:', data);
    };

    return (
        <>
            <Typography variant='h6' component='h1' gutterBottom>
                Форма запису до лікаря
            </Typography>
            {!isSelected && <form onSubmit={handleSubmit} style={{ width: '300px' }}>
              <Grid container spacing={2}>
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
                      Виберіть лікаря
                    </MenuItem>
                      {doctors.map((doctor) => (
                          <MenuItem key={doctor.id} value={doctor.id}>
                              {doctor.name}
                          </MenuItem>
                      ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputBase
                    type='date'
                    value={appointmentDate}
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
                    onChange={handleDateChange}
                    fullWidth
                    required
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
              <DoctorAppointmentForm setOpenModal={setOpenModal} appointmentDate={formDate.appointmentDate} doctorName={formDate.selectedDoctor} />}
        </>
    );
};

export default AppointmentForm;
