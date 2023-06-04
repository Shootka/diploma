import axios from 'axios';

export const login = async () => {
    const res = await axios.post('http://localhost:3001/auth/login',
        {
            phone: '380675202535',
            password: 'root',
        });
    console.log(res.data);
};
