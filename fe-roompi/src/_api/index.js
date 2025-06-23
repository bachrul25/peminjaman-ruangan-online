import axios from 'axios';

// const url = 'http://127.0.0.1:8000';
const url = 'https://roompi.karyakreasi.id';

export const API = axios.create({
    baseURL: `${url}/api`,
});

export const imageStorage = `${url}/storage`;