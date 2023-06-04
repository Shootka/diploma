import { DoctorSpeciality } from '@/components/enum/doctor-speciality.enum';
import axios from 'axios';

export const getDoctors = async (speciality: DoctorSpeciality) => {
    try {
        const res = await axios.get(`http://localhost:3001/visit/doctors`, {
            params: {
                speciality,
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};