/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { authDropbox, authDropboxCallback } from '../../api/customerFiles'
import { CustomerContext, NotificationContext } from '../../contexts'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export const CustomerFile = ({ scrollToFormTop }) => {
  const location = useLocation()
  // const navigate = useNavigate()

  const [ code, setCode ] = useState('')
  const [ state, setState ] = useState('')
  const {
    dropboxAccessToken,
    file,
    setCustomerLocalStorage,
    setDropboxAccessToken,
    setFile,
  } = useContext(CustomerContext)
  const { setNotification } = useContext(NotificationContext)

  const getAuthUrl = async () => {
    try {
      const { auth_url } = await authDropbox()

      if (auth_url) {
        setCustomerLocalStorage()
        // window.open(auth_url, '_blank');
        window.location.href = auth_url

        scrollToFormTop()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getAccessToken = useCallback(async(code, state) => {
    try {
      const { access_token } = await authDropboxCallback({ code, state });
      access_token && setDropboxAccessToken(access_token);
      
      scrollToFormTop()
    } catch (err) {
      console.error(err)
    }
  }, [])
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const code = queryParams.get('code')
    const state = queryParams.get('state')

    if (code && state) {
      setCode(code)
      setState(state)

      if (!dropboxAccessToken) {
        getAccessToken(code, state)
      }
    }

  }, [code, state, dropboxAccessToken])

  // Handle file upload
  const handleFile = async (file) => {
    console.log('file', file)

    if (file.type !== 'application/dicom' 
      && file.type !== 'image/jpeg') {
      
      setNotification({
        type: 'error',
        message: 'Please upload only .dcm, .jpg or .jpeg file'
      })
      return;
    } else {
      setFile(file)
    }
  };

  return (
    <section className="CustomerFile">
      <p>Upload your Dicom (.dcm) or JPEG (.jpg or .jpeg) files: </p>

      {dropboxAccessToken ? 
        <FilePond
          files={file}
          onupdatefiles={handleFile(file)}
          // onprocessfile={(file) => handleUpload(file)}
          allowMultiple={false}
          maxFiles={1}
          // maxFileSize="5MB" // Limit file size to 5MB, adjust as needed
          labelIdle='Drag & Drop your.DCM or.jpg files or <span class="filepond--label-action">Browse</span> here'
          labelFileProcessing='Uploading file...'
          labelFileProcessingComplete='Upload complete!'
        /> : 
        <p>Please click <u onClick={() => getAuthUrl()}>here</u> and proceed to Dropbox authentication</p>}
    </section>
  );
};