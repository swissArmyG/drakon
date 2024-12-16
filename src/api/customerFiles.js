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

export const uploadFileToDropbox = async ({
  accessToken,
  file
}) => {
  const dropboxUploadUrl = 'https://content.dropboxapi.com/2/files/upload';

  // Prepare the metadata for Dropbox (path, upload mode, etc.)
  const fileMetadata = {
    path: `/upload/${file.name}`, // Path in Dropbox where the file will be stored
    mode: 'add', // 'add' means add the file without overwriting if it exists
    autorename: true, // Auto-rename if the file already exists in Dropbox
    mute: false // Do not mute notifications
  };

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/octet-stream', // Indicating raw binary data
    'Dropbox-API-Arg': JSON.stringify(fileMetadata),
  };

  // Send the file as raw binary data in the body of the request
  const response = await axios.post(dropboxUploadUrl, file, {
    headers
  });

  return response.data;
}
