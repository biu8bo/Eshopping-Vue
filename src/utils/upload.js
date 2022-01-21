import axios from 'axios'
import Cookies from 'js-cookie'
import { baseApi } from '@/config'
export function upload(api, data) {
  // var data = new FormData()
  // data.append('file', file)
  const config = {
    headers: { 'Authorization': Cookies.get('Token') }
  }
  return axios.post(baseApi+api, data, config)
}




