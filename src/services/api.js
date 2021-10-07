import axios from 'axios'

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjczYjg5MzhlNTdmMzM4MjhiNGMxNDQ0NmNhZDdmNSIsInN1YiI6IjYxNWNjYjkzN2EzYzUyMDAyZDM4Mjc4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mTLSt5ctR6uBwHgFoFOphq8lKDvR3XT8Ms9y9Ddz3z8'
const api = axios.create({
  baseURL:'https://api.themoviedb.org/3/',  
})

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

api.interceptors.request.use((config) => {
  let arr, url
  if(config.url.includes('API_KEY')) {
    arr = config.url.split('API_KEY')
    url = arr[0] + 'api_key=e673b8938e57f33828b4c14446cad7f5' + arr[1]
    config.url = url
    return config
  
  }
  
  
},
(error) => Promise.reject(error))

export default api;