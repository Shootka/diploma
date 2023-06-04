import axios from 'axios';
import { SubmitData } from '@/components/forms/RegistrationForm';
import toast from 'react-hot-toast';

export const register = async (data: SubmitData) => {
    try {
        const res = await axios.post('http://localhost:3001/auth/registration', data);
        return res.data;
    } catch
        (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (err?.response?.status === 409) toast.error('Помилка реєстраціЇ, користувач з таким номером телефона вже зареэстрован');
        else toast.error('Помилка реєстраціЇ, повторіть помилку ');
    }
};