import axios from 'axios'


export const http = axios.create({
	baseURL: "https://crates-finder-5b6071ee0f7e.herokuapp.com/api",
});

http.interceptors.request.use(async (request) => {

  return request;
})
