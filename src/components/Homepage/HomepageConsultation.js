/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useCallback, useContext, useEffect, useState } from "react"
import LazyLoad from 'react-lazy-load';
import { ProgressBar } from "../Assorted"
import { CustomerFile, CustomerProfileForm } from "../Customer"
import { CustomerContext, NotificationContext } from "../../contexts"
import { AdditionalQuestionsForm, ConditionForm, PageControls } from "../Consultation"
import { PAGE_VARIABLES } from "../Consultation"
import spineGraphic from '../../img/shapes/form_spine_graphic.png'
import { formHeader } from "../../copies/homepage-form-options";
import { createCustomer } from "../../api/customers";
import { authDropboxCallback, uploadFileToDropbox } from "../../api/dropbox";
import { useLocation, useNavigate } from "react-router-dom";

export const HomepageConsultation = forwardRef((_props, ref) => {
  const location = useLocation()
  const navigate = useNavigate()

  const { FIRST_PAGE, LAST_PAGE } = PAGE_VARIABLES
  const {
    customerProfile,
    file,
    isValidatingForm,
    page,
    stepsCompleted,
    removeCustomerLocalStorage,
    resetForm,
    setDropboxAccessToken,
    setIsSubmitting,
    setPage,
  } = useContext(CustomerContext)

  const { setNotification } = useContext(NotificationContext)

  const [ isMobileDevice, setIsMobileDevice ] = useState(false)
  const [ windowSize, setWindowSize ] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const uploadFile = useCallback(async() => {
    const queryParams = new URLSearchParams(location.search)
    const code = queryParams.get('code')
    const state = queryParams.get('state')

    const { access_token } = await authDropboxCallback({ code, state })

    const firstFile = file[0]
    if (!firstFile.name) {
      setNotification({
        type: 'error',
        message: 'Missing a file, please try again later.'
      })
    }

    if (access_token) {
      setDropboxAccessToken(access_token)

      try {
        await uploadFileToDropbox({ access_token, file: firstFile })
      } catch (err) {
        setNotification({ 
          type: 'error', 
          message: 'Unable to upload file currently, please check your internet connection or try again later' 
        })
      }
    }
  }, [file])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const pageParam = queryParams.get('page');
    const code = queryParams.get('code');
    const state = queryParams.get('state');

    const parsedPage = parseInt(pageParam) || FIRST_PAGE;
    if (!parsedPage !== page) {
      setPage(parsedPage)
    }

    if (location.pathname === '/auth/dropbox/callback' && code && state) {
      const updatedParams = new URLSearchParams(location.search);
      updatedParams.set('page', LAST_PAGE);

      const newUrl = `${location.pathname}?${updatedParams.toString()}#consultation`;
      navigate(newUrl, { replace: true });

      scrollToFormTop()
    }

    if (location.hash === '#consultation') {
      scrollToFormTop()
    }
  }, [location, page])

  const navigateToFormPage = (page) => {
    navigate(`?page=${page}#consultation`)
  }

  const scrollToFormTop = () => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: !isMobileDevice ? window.innerWidth : window.width,
        height: !isMobileDevice ? window.innerHeight : window.height,
      });
      setIsMobileDevice(/Mobi/i.test(navigator.userAgent)
    )}

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileDevice, windowSize.width]);

  const renderHeader = () => {
    return <React.Fragment>
      <div className="--header-container">
        <LazyLoad>
          <img src={spineGraphic} alt="A section of a spine" className="--header-logo" />
        </LazyLoad>
        <p className="--header-text">
          {formHeader}
        </p>
      </div>
      <ul>
        <li>A board certified spine surgeon review of your imaging studies.</li>
        <li>An evaluation of your symptoms.</li>
        <li>A recommendation for your surgical procedure, or intervention.</li>
      </ul>
    </React.Fragment>
  }

  const renderRequiredWarning = () => {
    return (isValidatingForm
      && stepsCompleted < page)
      && <span className="--required --ml-10px">
        <em><i>
          <sup>*</sup>
          Please fill out required fields
        </i></em>
      </span>
  }

  const submitConsultationRequest = async () => {
    if (customerProfile) {
      setIsSubmitting(true)

      try {
        await createCustomer(customerProfile)
        await uploadFile()
        setNotification({ 
          type: 'success', 
          message: 'You have requested a consultation! Our doctor will reach out to you soon via the email or the phone number you provided.'
        })
        resetForm()
        removeCustomerLocalStorage()
      } catch (err) {
        setNotification({ 
          type: 'error', 
          message: 'Unable to make a consultation request currently, please try again later.'
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }
  
  return (
    <section ref={ref} className="HomepageConsultation">
      <div className="--background-overlay" />
        <div className="--form-container">
          {renderHeader()}
          {renderRequiredWarning()}
          {page === FIRST_PAGE && <CustomerProfileForm />}
          {page === 2 && <ConditionForm />}
          {page >= 3 && <AdditionalQuestionsForm />}
          {page === LAST_PAGE && <CustomerFile />}
          <ProgressBar 
            steps={LAST_PAGE} 
            stepsCompleted={stepsCompleted}
          />
          <PageControls 
            navigateToFormPage={navigateToFormPage}
            onSubmit={submitConsultationRequest}
            windowWidth={windowSize.width} 
            scrollToFormTop={scrollToFormTop}
          />
        </div>
    </section>
  )
})