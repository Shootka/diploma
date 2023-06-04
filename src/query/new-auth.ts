import axios from 'axios';
import { DoctorSpeciality } from '@/components/enum/doctor-speciality.enum';
import { getLocalStorageValue } from '@/utils/getLocalStorageValue';
import { TOKEN } from '@/static/storageKeys';
import toast from 'react-hot-toast';

interface Data {
    medicalDirection: DoctorSpeciality,
    patientId: string,
    doctorId: string,
    visitDate: string
}

const token = JSON.parse(getLocalStorageValue(TOKEN) ?? '');
export const newAuth = async (data: Data) => {
    try {
        const res = await axios.post(`http://localhost:3001/visit/new-auth`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.data) toast.success(`Запис створено, чекаєм на вас ${data.visitDate}!`);
        return res.data;
    } catch (err) {
        toast.error(`Запис не створено, сталась помилка!`);
    }
};