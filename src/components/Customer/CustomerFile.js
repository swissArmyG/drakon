/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import { useLocation } from "react-router-dom";
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { authDropbox } from '../../api/dropbox'
import { CustomerContext, NotificationContext } from '../../contexts'
import { SingleSelect } from '../Assorted/Inputs';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export const CustomerFile = () => {
  const location = useLocation()

  const {
    file,
    setFile
  } = useContext(CustomerContext)
  const { setNotification } = useContext(NotificationContext)

  const [ isAllowingDropboxOAuth, setIsAllowingDropboxOAuth ] = useState(false)

  useState(() => {
    const queryParams = new URLSearchParams(location.search)
    const code = queryParams.get('code');
    const state = queryParams.get('state');

    if (code && state) {
      setIsAllowingDropboxOAuth(true)
    }

  }, [location.search])

  const isValidFileType = (file) => {
    if (!file) {
      return false;
    }

    const validTypes = ['application/dicom', 'application/dcm', 'image/jpeg'];
    const validExtensions = ['dcm', 'jpg', 'jpeg'];

    const fileType = file.type?.toLowerCase();
    const fileExtension = file.name.toLowerCase().split('.').pop();
    const mimeTypeIsValid = validTypes.includes(fileType); // Check mime type
    const extensionIsValid = validExtensions.includes(fileExtension); // Check extension

    return mimeTypeIsValid || extensionIsValid;
  };

  let isAuthenticating = false
  const getAuthUrl = async () => {
    try {
      if (isAuthenticating) return;
      isAuthenticating = true

      const { auth_url } = await authDropbox()

      if (auth_url) {
        window.location.href = auth_url
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: 'Unable to connect with Dropbox, please try again later.'
      });
    }
  }

  const handleFile = (fileItems) => {  
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  
    if (!fileItems || fileItems.length === 0) {
      setNotification({
        type: 'error',
        message: 'No valid file.'
      });
    }
  
    const firstFile = fileItems[0].file;
  
    if (!isValidFileType(firstFile)) {
      setNotification({
        type: 'error',
        message: 'Only .dcm, .jpg, or .jpeg files are allowed.'
      });
    }
  
    if (firstFile.size > MAX_FILE_SIZE) {
      setNotification({
        type: 'error',
        message: 'File exceeds the maximum size of 5MB.'
      });
    }
  
    setFile([firstFile]);
  };
  
  const handleRemoveFile = (error) => {
    if (error) {
      console.error("Error removing file:", error);
      return;
    }
    setFile([]);
  };

  const onAllowDropboxOAuth = () => {
    setIsAllowingDropboxOAuth(!isAllowingDropboxOAuth)
    getAuthUrl()
  }

  const determineIsDropboxOAuthAuthenticated = () => {
    if (!isAllowingDropboxOAuth) {
      return <React.Fragment> 
      <p>Please consent to connect your Dropbox account to securely upload files (.DCM, .JPG, or .JPEG)</p>
      <SingleSelect
        option={"By clicking the checkbox, you’ll be redirected to Dropbox to authenticate. Once connected, you can upload your file securely."}
        selectOption={() => onAllowDropboxOAuth()}
      />
      </React.Fragment>
    } else {
      return <React.Fragment>
        <p>You are now connected to Dropbox and can upload your file securely.</p>
        <FilePond
          acceptedFileTypes={['image/jpeg', '.dcm']}
          files={file} // Let FilePond control files state
          onupdatefiles={(fileItems) => handleFile(fileItems)} // Only validate on file addition
          allowMultiple={false}
          maxFiles={1}
          maxFileSize="5MB"
          labelIdle={`<label id="filepond--drop-label" inert>
            Drag & Drop your .DCM, .JPEG, .JPG files or 
            <span class="filepond--label-action">Browse</span> here
          </label>`}
          labelFileProcessing='Uploading file...'
          labelFileProcessingComplete='Upload complete!'
          onremovefile={handleRemoveFile}  // Handle file removal without validation
        />
      </React.Fragment>
    }
  }

  return (
    <section className="CustomerFile">
      <em>Files Upload</em>
      {determineIsDropboxOAuthAuthenticated()}
    </section>
  );
};