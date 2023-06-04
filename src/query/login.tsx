import axios from 'axios';
import toast from 'react-hot-toast';

interface Props {
    password: string,
    phone: string
}

export const login = async (data: Props) => {
    try {
        const res = await axios.post(`http://localhost:3001/auth/login`,
            data);
        return res.data;
    } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (err?.response?.status === 400) toast.error('Помилка авторизації, перевірте правильність даних!');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (err?.response?.status === 500) toast.error('Інтернет підключення відсутнє!');
        else toast.error('Помилка авторизації, повторіть помилку!');

    }

};
