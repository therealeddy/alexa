import axios from 'axios'
import { env } from '../config/env'

const api = axios.create({
  baseURL: env.API_SPOTIFY,
})

export const apiAccount = axios.create({
  baseURL: env.API_ACCESS_SPOTIFY,
})

export default api
