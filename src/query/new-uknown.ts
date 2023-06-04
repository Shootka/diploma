import axios from 'axios';
import { DoctorSpeciality } from '@/components/enum/doctor-speciality.enum';
import toast from 'react-hot-toast';
import { getLocalStorageValue } from '@/utils/getLocalStorageValue';
import { TOKEN } from '@/static/storageKeys';

interface Data {
    medicalDirection: DoctorSpeciality,
    doctorId: string,
    visitDate: string
    lastName: string,
    firstName: string,
    patronym: string,
    birthDate: string,
    phone: string,
    email: string
}
const token = JSON.parse(getLocalStorageValue(TOKEN) ?? '');
export const newUknown = async (data: Data) => {
    try {
        const res = await axios.post(`http://localhost:3001/visit/new-unknown`, data, {
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