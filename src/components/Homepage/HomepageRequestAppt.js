import React, { useState, useEffect, forwardRef, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { 
  singleSelectOption, 
  multipleSelectOptions 
} from '../../copies/homepage-form-options'
import spineGraphic from '../../img/shapes/form_spine_graphic.png'
import { FadedBgButton } from '../Buttons';
import { PatientProfileForm, ProgressBar } from "../Assorted";
import { createPatient, requestExistingAccountConsultation } from "../../api/patients";
import { AuthContext, NotificationContext, PatientContext } from "../../contexts";

export const HomepageRequestAppt = forwardRef((_props, ref) => {
  const FIRST_PANE = 1
  const LAST_PANE = 2
  const INCOMPLETE = 0

  const { userData } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const { 
    isRegistering,
    singleOption,
    multipleOptions,
    painDescriptions,
    painDegree,
    patientProfile,
    selectSingleOption,
    selectMultipleOptions,
    setPainDegree,
    setPatientProfile
  } = useContext(PatientContext)

  const [ pane, setPane ] = useState(FIRST_PANE)
  const [ stepsCompleted, setStepsCompleted ] = useState(INCOMPLETE)

  const [ isMobileDevice, setIsMobileDevice ] = useState(false)
  const [ windowSize, setWindowSize ] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

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

  useEffect(() => {
    const firstStepCompleted = !!painDegree && (
      !!singleOption 
        ? multipleOptions.concat(singleOption).length >= 1 
        : multipleOptions.length >= 1
    )

    const { firstname = '', lastname = '', email = '', phoneNumber = '' } = patientProfile || {};
    const secondStepCompleted = firstname && lastname && email && phoneNumber 

    let stepsCompleted = INCOMPLETE;

    if (firstStepCompleted || secondStepCompleted) {
      stepsCompleted = 1;
    }
    if (firstStepCompleted && secondStepCompleted) {
      stepsCompleted = 2;
    }
    
    setStepsCompleted(stepsCompleted)
  }, [singleOption, multipleOptions, painDegree, patientProfile])


  const isSingleSelected = (option) => {
    return singleOption === option ? '--selected' : ''
  }

  const isMultipleSelected = (option) => {
    return multipleOptions.includes(option) ? '--selected' : ''
  }

  const determineSingleOption = (option) => {
    if (!singleOption || singleOption !== option) {
      return option
    } else {
      return singleOption === option ? undefined : singleOption
    }
  }

  const determineMultipleOptions = (option) => {
    selectMultipleOptions(prevState => {
      if (isMultipleSelected(option)) {
        return prevState.filter(op => op!== option)
      } else {
        return [...prevState, option]
      }
    })
  }

  const resetForm = () => {
    selectSingleOption('')
    selectMultipleOptions([])
    setPainDegree('')
    setPatientProfile(undefined)
    setPane(FIRST_PANE)
    setStepsCompleted(0)
  }

  const requestNonAccountConsultation = async () => {
    setIsSubmitting(true)
    
    try {
      patientProfile && await createPatient({
        firstname: patientProfile.firstname,
        lastname: patientProfile.lastname,
        pain_description: painDescriptions,
        pain_degree: painDegree,
        address: patientProfile.address,
        email: patientProfile.email,
        phone_number: patientProfile.phoneNumber
      })

      setNotification({ 
        type: 'success', 
        message: 'You have requested an appointment! Our doctor will reach out to you soon via the email or the phone number you provided.'
      })

      resetForm()
    } catch (err) {
      setNotification({ 
        type: 'error', 
        message: 'Unable to request appointment currently, please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderHeader = () => {
    return <div className="--header-container">
      <img src={spineGraphic} alt="A section of a spine" className="--header-logo" />
      <p className="--header-text">Please send us your details electronically to make an appointment with us. Use the online form below. An associate from <em>PeaceOfMindSpine.com</em> (POMS) will contact you soon.</p>
    </div>
  }

  // TODO: Refactor and componentalize these
  const renderConditionForm = () => {
    return <div className="ConditionForm">
      <div className="--options-container">
        <p><i>Please select <em>one</em> of the following:</i></p>
        {
          Object.keys(singleSelectOption).map((option, index) => {
            return <div key={index} className='--option-container'>
              <div 
                className={`--checkbox --button ${isSingleSelected(option)}`} 
                onClick={(e) => {
                  e.preventDefault()
                  selectSingleOption(determineSingleOption(option))
                }}/>
              <p className={`--checkoption ${isSingleSelected(option)}`}>
                {singleSelectOption[option]}
              </p>
            </div>
          })
        }
      </div>

      <div className="--options-container">
        <p><i>-OR- select <em>one or more</em> of the following:</i></p>
        {
          Object.keys(multipleSelectOptions).map((option, index) => {
            return <div key={index} className='--option-container'>
              <div 
                className={`--checkbox --button ${isMultipleSelected(option)}`} 
                onClick={(e) => {
                  e.preventDefault()
                  determineMultipleOptions(option)
                }}/>
              <p className={`--checkoption ${isMultipleSelected(option)}`}>
                {multipleSelectOptions[option]}
              </p>
            </div>
          })
        }
      </div>
      {renderInputContainer()}
    </div>
  }

  const renderPaneControls = () => {
    const buttonWidth = windowSize.width > 613 ? "300px" : "160px"
    const buttonTextPosition = windowSize.width > 613 ? undefined : "0%"
    
    const isFirstPane = pane === FIRST_PANE
    const isLastPane = pane === LAST_PANE

    const isNextable = stepsCompleted >= FIRST_PANE
    const isSubmittable = isLastPane && stepsCompleted === LAST_PANE 

    let isDisabled = false;

    if (isFirstPane) {
      isDisabled = !isNextable
    } else if (isLastPane) {
      isDisabled = !isSubmittable
    } else if (isSubmitting) {
      isDisabled = true
    }

    const determineSubmitButtonText = () => {
      return (!userData && isRegistering) 
        ? 'REGISTER' 
        : 'SUBMIT'
    }

    const _requestExistingAccountConsultation = async (patientId) => {
      try {
        await requestExistingAccountConsultation(patientId)
        resetForm()
      } catch {
        setNotification({
          type: 'error',
          message: 'Something went wrong while requesting a new consultation. Please try again later.'
        })
      }
    }

    const determineSubmitButtonFunc = () => {
      // CONFIRMATION REQUIRED: if the user account already exists, and the login email is different than the patient email.

      // IF CONFIRMED: update the patient with the new email
      if (userData) {
        userData.email !== patientProfile.email
          ?  navigate("/confirm", {
            state: { email: patientProfile.email }
          })
          : _requestExistingAccountConsultation(patientProfile.id)
      } else {
        isRegistering
          ? navigate("/register")
          : requestNonAccountConsultation()
      }
    }

    return <div className="PaneControl">
      <div className="--button-container">
        <FadedBgButton
          buttonText={'BACK'} 
          buttonTextPosition={buttonTextPosition}
          onClick={(e) => {
            e.preventDefault()
            pane > FIRST_PANE && setPane(pane - 1)          
          }}
          isDisabled={pane === FIRST_PANE}
          width={buttonWidth}
        />
      </div>
      <div className="--button-container">
        <FadedBgButton    
          buttonText={pane < LAST_PANE ? 'NEXT' : determineSubmitButtonText()} 
          buttonTextPosition={buttonTextPosition}
          onClick={(e) => {
            e.preventDefault() 
            if (isFirstPane && isNextable) {
              setPane(pane + 1)
            }
            if (isLastPane && isSubmittable) {
              determineSubmitButtonFunc()
            }
          }}
          isDisabled={isDisabled}
          isFlipped
          width={buttonWidth}
        />
      </div>
    </div>
  }

  const renderInputContainer = () => {
    return <div className="InputContainer">
      <label htmlFor="painDegree">Rate your overall degree of pain right now from 1-10: </label>
      <input id="painDegree" type="number" max="10"
        value={painDegree > 0 ? painDegree : undefined}
        onChange={({ target: { value }}) => {
          if (value < 1 || !value || value.length === 0) {
            value = 0
          }
          if (value > 10) {
            value = 10
          }
          setPainDegree(value)
        }}/>
    </div>
  }
  
  return (
    <section ref={ref} className="HomepageRequestAppt">
      <div className="--background-overlay" />
        <div className="--form-container">
          {renderHeader()}
          {pane === FIRST_PANE && renderConditionForm()}
          {pane === LAST_PANE && <PatientProfileForm />}
          <ProgressBar 
            steps={2} 
            stepsCompleted={stepsCompleted}
          />
          {renderPaneControls()}
        </div>
    </section>
  )
})