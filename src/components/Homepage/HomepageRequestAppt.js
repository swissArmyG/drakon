import React, { useState, useEffect, forwardRef } from "react"
import { 
  singleSelectOption, 
  multipleSelectOptions 
} from '../../copies/homepage-form-options'
import spineGraphic from '../../img/shapes/form_spine_graphic.png'
import { FadedBgButton } from '../Buttons';
import { PatientProfileForm, ProgressBar } from "../Assorted";
import { createPatient } from "../../servers/patients";

export const HomepageRequestAppt = forwardRef((props, ref) => {
  const FIRST_PANE = 1
  const LAST_PANE = 2
  const INCOMPLETE = 0
  
  const [ singleOption, selectSingleOption ] = useState('')
  const [ multipleOptions, selectMultipleOptions ] = useState([])

  const [ painDegree, setPainDegree ] = useState(undefined)
  const [ patientProfile, setPatientProfile ] = useState({
    firstname: '',
    lastname: '',
    address: '',
    email: '',
    phoneNumber: ''
  })

  const [ pane, setPane ] = useState(FIRST_PANE)
  const [ stepsCompleted, setStepsCompleted ] = useState(INCOMPLETE)

  const [ isMobileDevice, setIsMobileDevice ] = useState(false)
  const [ windowSize, setWindowSize ] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

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

    const { firstname, lastname, email, phoneNumber } = patientProfile
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
    setPainDegree(undefined)
    setPatientProfile({
      firstname: '',
      lastname: '',
      address: '',
      email: '',
      phoneNumber: ''
    })
    setPane(FIRST_PANE)
    setStepsCompleted(0)
  }

  const requestAppointment = async () => {
    setIsSubmitting(true)
    
    const painDescriptions = [
      ...multipleOptions.map(option =>{               
        return multipleSelectOptions[option]
      }), 
      singleSelectOption[singleOption]
    ].join(', ')

    try {
      await createPatient({
        firstname: patientProfile.firstname,
        lastname: patientProfile.lastname,
        pain_description: painDescriptions,
        pain_degree: painDegree,
        address: patientProfile.address,
        email: patientProfile.email,
        phone_number: patientProfile.phoneNumber
      })
      props.notify({ 
        type: 'success', 
        message: 'You have requested an appointment! Our doctor will reach out to you soon via the email or the phone number you provided.'
      })
      resetForm()
    } catch (err) {
      props.notify({ 
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

  const renderConditionForm = () => {
    return <div className="ConditionForm">
      <div className="--options-container">
        <label><i>Please select <em>one</em> of the following:</i></label>
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
        <label><i>-OR- select <em>one or more</em> of the following:</i></label>
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
    const buttonTextPosition = windowSize.width > 613 ? "-28%" : "-88%"
    
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
          buttonText={pane < LAST_PANE ? 'NEXT' : 'SUBMIT'} 
          buttonTextPosition={buttonTextPosition}
          onClick={(e) => {
            e.preventDefault() 
            
            if (isFirstPane && isNextable) {
              setPane(pane + 1)
            }
            
            if (isLastPane && isSubmittable) {
              requestAppointment()
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
      <label>Rate your overall degree of pain right now from 1-10: </label>
      <input type="number" max="10"
        value={painDegree}
        onChange={({ target: { value }}) => {
          if (value < 1 || !value) {
            value = undefined
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
          {pane === LAST_PANE && <PatientProfileForm
            patientProfile={patientProfile}  
            onChange={(data) => setPatientProfile({ ...patientProfile, ...data })} />}
          <ProgressBar 
            steps={2} 
            stepsCompleted={stepsCompleted}
          />
          {renderPaneControls()}
        </div>
    </section>
  )
})