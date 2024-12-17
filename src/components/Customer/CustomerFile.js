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

  const {
    dropboxAccessToken,
    file,
    setDropboxAccessToken,
  } = useContext(CustomerContext)
  const { setNotification } = useContext(NotificationContext)

  const [filesState, setFilesState] = useState(file || []);

  const getAuthUrl = async () => {
    try {
      const { auth_url } = await authDropbox()

      if (auth_url) {
        const authWindow = window.open(auth_url, '_blank')
        const interval = setInterval(() => {
          try {
            if (authWindow.location && authWindow.location.href.includes('page7#consultation')) {
              clearInterval(interval)
              authWindow.close()
            } 
          } catch (err) {
            setNotification('Unable to load right now, please try again later')
          }
        }, 500)

        scrollToFormTop()
      }
    } catch (err) {
      setNotification('Unable to load right now, please try again later')
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
    
    if (code && state && !dropboxAccessToken) {
      getAccessToken(code, state)
    }
  }, [location.search, dropboxAccessToken])

  const handleFile = async (files) => {
    console.log("Received files:", files); // Log the files object for debugging
  
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  
    // Check if files is not empty or undefined
    if (!files || files.length === 0) {
      setNotification({
        type: 'error',
        message: 'No files added.'
      });
      return;
    }
  
    // Let's loop through each file and check if it's valid
    files.forEach(file => {
      console.log("Checking file:", file); // Log each file object for debugging
  
      if (!file || !file.name) {
        console.log("Invalid file detected:", file); // This file is invalid, log it
        setNotification({
          type: 'error',
          message: 'Only .dcm, .jpg, or .jpeg files are allowed.'
        });
        return;
      }
  
      const isValidFileType = (file) => {
        const validTypes = ['application/dicom', 'application/dcm', 'image/jpeg'];
        const validExtensions = ['.dcm', '.jpg', '.jpeg'];
  
        const fileExtension = file.name.toLowerCase().split('.').pop();
        const mimeTypeIsValid = validTypes.includes(file.type); // Check mime type
        const extensionIsValid = validExtensions.includes(`.${fileExtension}`); // Check extension
  
        return mimeTypeIsValid || extensionIsValid;
      };
  
      // Validate file type
      if (!isValidFileType(file)) {
        console.log("File type invalid:", file); // Log invalid file
        setNotification({
          type: 'error',
          message: 'Only .dcm, .jpg, or .jpeg files are allowed.'
        });
        return;
      }
  
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        console.log("File size exceeds limit:", file); // Log file exceeding size
        setNotification({
          type: 'error',
          message: 'File exceeds the maximum size of 5MB.'
        });
        return;
      }
  
      // All checks passed, so update the state
      setFilesState(files);
    });
  };

  const handleRemoveFile = (file) => {
    // Simply remove the file from the state when it's removed from FilePond
    const updatedFiles = filesState.filter(f => f !== file);
    setFilesState(updatedFiles);
  }

  return (
    <section className="CustomerFile">
      <p>Upload your Dicom (.dcm) or JPEG (.jpg or .jpeg) files:</p>
      <FilePond
        acceptedFileTypes={['image/jpeg', '.dcm']}
        files={filesState} // Let FilePond control files state
        onupdatefiles={(files) => handleFile(files)} // Only validate on file addition
        onprocessfile={getAuthUrl}
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
    </section>
  );
};
