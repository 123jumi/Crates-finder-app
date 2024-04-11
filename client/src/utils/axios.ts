import axios from 'axios'


export const http = axios.create({ baseURL: "https://www.cratesfinder.com/api" });

http.interceptors.request.use(async (request) => {

  return request;
})
