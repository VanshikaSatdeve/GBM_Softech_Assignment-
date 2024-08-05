import axios from "axios";

// Create axios instance with baseURL
export const axiosHttp = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

export function Get(url) {
  return axiosHttp.get(url);
}

export function Post(url, data) {
  return axiosHttp.post(url, data);
}

export function Delete(url) {
  return axiosHttp.delete(url);
}

export function Put(url, data) {
  return axiosHttp.put(url, data);
}




// create intercepter for request
// axiosHttp.interceptors.request.use(
//     (config) => {
//         const token = !!sessionStorage.getItem("accessToken");//removeItem('jwt'),setItem('jwt','sdasdsad')
//         return {
//             ...config,
//             headers: {
//                 ...(token && { 'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}` }),
//                 ...config.headers,
//             }
//         }
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// );

// create intercepter for response
//when we use intercepter No need to access response.data in action.js, as the interceptor already extracts data

axiosHttp.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
);

//Global request for Http Request

// export const Get = (url, headers = {}) => {
//     return axiosHttp.get(url, { headers: headers })
// }

// export const Post = (url, payload, headers = {}) => {
//     return axiosHttp.post(url, payload, { headers: headers })
// }

// export const Put = (url, payload, headers = {}) => {
//     return axiosHttp.put(url, payload, { headers: headers })
// }

// export const Delete = (url, headers = {}) => {
//     return axiosHttp.delete(url, { headers: headers })
// }

// export const Patch = (url, payload, headers = {}) => {
//     return axiosHttp.patch(url, payload, { headers: headers })
// }

