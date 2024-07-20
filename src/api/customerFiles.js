import axios from 'axios'
import { Axios } from './axios'

export const authDropbox = async() => {
  const { data } = await Axios.get('/auth/dropbox')
  return data;
}

export const authDropboxCallback = async({ code, state }) => {
  const { data } = await Axios.get('/auth/dropbox/callback', {
    params: { code, state }
  })
  return data;
}

export const uploadFile = async ({
  accessToken,
  formData,
  file
}) => {
  const { data } = await axios.post('/customers/dropbox/upload', formData, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
      'Dropbox-API-Arg': JSON.stringify({
        path: `/upload/${file.name}`,
        mode: 'add',
        autorename: true,
        mute: false,
      }),
    }
  });;
  return data;
}
