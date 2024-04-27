import React, { useState, forwardRef } from "react"
import { 
  singleSelectOption, 
  multipleSelectOptions 
} from '../../copies/homepage-form-options'

export const HomepageRequestAppt = forwardRef((_, ref) => {
  const [ singleOption, selectSingleOption ] = useState(undefined)
  const [ multipleOptions, selectMultipleOptions ] = useState([])
  const [ pane, setPane ] = useState(0)

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
    if (isMultipleSelected(option)) {
      selectMultipleOptions(multipleOptions.filter(op => op !== option))
    } else {
      selectMultipleOptions([...multipleOptions, option])
    }
  }

  const renderHeader = () => {
    return <div className="--header-container">
      <div className="--header-logo-placeholder" />
      <p className="--header-text">Please send us your details electronically to make an appointment with us. Use the online form below.<br />An associate from <em>PeaceOfMindSpine.com</em> (POMS) will contact you soon.</p>
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
        <label><i>Please select <em>one or more</em> of the following:</i></label>
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
    </div>
  }

  const renderPatientDetailForm = () => {
    return <div className="PatientDetailForm">
       <h1>Patient Info</h1>
    </div>
  }

  const renderPaneControls = () => {
    return <div className="PaneControl">
      <button disabled={pane === 0} 
        onClick={(e) => {
          e.preventDefault()
          pane !== 0 && setPane(pane - 1)
        }}>
        Back
      </button>
      <button disabled={pane === 1} 
        onClick={(e) => {
          e.preventDefault()
          pane !== 1 && setPane(pane + 1)
        }}>
        Next
      </button>
    </div>
  }
  
  return (
    <section ref={ref} className="HomepageRequestAppt">
      <div className="--background-overlay" />
        <div className="--form-container">
          {renderHeader()}
          {pane === 0 && renderConditionForm()}
          {pane === 1 && renderPatientDetailForm()}
          {renderPaneControls()}
        </div>
    </section>
  )
})