import axios from "axios";

export const nbaApi = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    Authorization: import.meta.env.VITE_API_KEY,
  },
});
