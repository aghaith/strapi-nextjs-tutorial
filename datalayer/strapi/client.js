import axios from "axios";

const apiURL = process.env.STRAPI_API_BASE_URL;
const token = `Bearer ${process.env.STRAPI_API_TOKEN}`;

const strapi = axios.create({
    baseURL: apiURL,
    headers: {
        Pragma: "no-cache",
        "Cache-control": "no-cache",
        "Content-Type": "application/json"
    },
    timeout: 10000,
})

strapi.interceptors.request.use(function (config) {
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default strapi;