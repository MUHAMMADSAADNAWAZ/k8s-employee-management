import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:3001"
// });

const api = axios.create({
    baseURL: "/api"
});

export default api;