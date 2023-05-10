import axios from 'axios';
import isDev from './isDev';

const baseURL = isDev() ? 'http://localhost:8080/' : 'https://project-tracker-api-production.up.railway.app/';
const abortController = new AbortController();

export const api = axios.create({
    baseURL: baseURL,
    headers: {
        "ngrok-skip-browser-warning": "true",
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

api.interceptors.request.use(
    request => {
        if (request.url?.includes('private')) {
            var token = localStorage.getItem("token");
            if (token === null) {
                abortController.abort();
                throw new axios.Cancel('Login to continue.');
            }
            request.headers['Authorization'] = 'Basic ' + token;
        }
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {  
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            alert("Login to continue.");
        } else {
            return Promise.reject(error);
        }
    }
);