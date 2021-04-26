import axios from 'axios';

const thisAxios = axios.create({
    baseURL: import.meta.env.VITE_APP_FIREBASE_URL,
});

export default thisAxios;
