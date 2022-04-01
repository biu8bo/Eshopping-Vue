import axios from 'axios'
import Cookies from 'js-cookie'
import { baseApi } from '@/config'
export function upload(file) {
  var data = new FormData()
   data.append('file', file)
  const config = {
    headers: { 'Content-Type':'multipart/form-data'}
  }
  return axios.post(baseApi+"/upload", data, config)
}
export default{
  upload
}



