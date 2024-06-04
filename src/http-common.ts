import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
     baseURL: `${import.meta.env.VITE_API_HOST}/${import.meta.env.VITE_API_URI}`,
     headers: {
          Accept: "application/json",
     },
});

const adminApi: AxiosInstance = axios.create({
     baseURL: `${import.meta.env.VITE_API_HOST}/${import.meta.env.VITE_ADMIN_URI}`,
     headers: {
          Accept: "application/json",
     },
});

const clientApi: AxiosInstance = axios.create({
     baseURL: `${import.meta.env.VITE_API_HOST}/${import.meta.env.VITE_CLIENT_URI}`,
     headers: {
          Accept: "application/json",
     },
});

const authApi: AxiosInstance = axios.create({
     baseURL: `${import.meta.env.VITE_API_HOST}/${import.meta.env.VITE_AUTH_URI}`,
     headers: {
          Accept: "application/json",
     },
});

const $http = {
     api,
     adminApi,
     clientApi,
     authApi,
};

export default $http;
