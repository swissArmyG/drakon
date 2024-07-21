import React, { useContext, useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { authDropbox, authDropboxCallback } from '../../api/customerFiles';
import { uploadFile } from '../../api/customerFiles';
import { NotificationContext } from '../../contexts'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export const CustomerFile = () => {
  const [ code, setCode ] = useState('')
  const [ state, setState ] = useState('')

  const [ files, setFiles ] = useState([])
  const [ accessToken, setAccessToken ] = useState('')

  const { setNotification } = useContext(NotificationContext)

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code')
    const state = params.get('state')

    code && setCode(code)
    state && setState(state)
  }, [])

  useEffect(() => {
    const getAccessToken = async() => {
      try {
        const { access_token } = await authDropboxCallback({ code, state })
        setAccessToken(access_token)
      } catch (err) {
        console.error(err)
      }
    }

    if (code && state) {
      getAccessToken()
    }
  }, [code, state])

  // Handle file upload
  const handleUpload = async (file) => {
    console.log('file', file)

    if (file.type !== 'application/dicom' 
      && file.type !== 'image/jpeg') {
      
      setNotification({
        type: 'error',
        message: 'Please upload only .dcm, .jpg or .jpeg file'
      })
    }

    // Upload file to Dropbox
    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadFile(accessToken, formData)
    } catch (err) {
      setNotification({ type: 'error', message: 'Unable to upload file currently, please check your internet connection or try again later' })
    }
  };

  const getAuthUrl = async () => {
    try {
      const { auth_url } = await authDropbox()
      console.log(auth_url)

      if (auth_url) {
        window.location.href = auth_url
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="CustomerFile">
      <p>File upload</p>
      
      <em>Before you download</em>
      <u onClick={() => getAuthUrl()}>Please click here to authenticate with Dropbox</u>

      <FilePond
        files={files}
        onupdatefiles={(files) => setFiles(files)}
        onprocessfile={(file) => handleUpload(file)}
        allowMultiple={false}
        maxFiles={1}
        labelIdle='Drag & Drop your.DCM or.jpg files or <span class="filepond--label-action">Browse</span> here'
      />
    </section>
  );
};