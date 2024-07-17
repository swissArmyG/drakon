import React, { useContext } from "react"
import { firstPageQuestions } from '../../copies/homepage-form-options'
import { CustomerContext } from "../../contexts"
import { DetailedInput, LabeledInput, SingleSelect } from "../Assorted/Inputs"
import { MultipleSelects } from "../Assorted/Inputs"

export const ConditionForm = () => {
  const { 
    customerProfile,
    setCustomerProfile,
  } = useContext(CustomerContext)

  const onChange = (data) => {
    setCustomerProfile({ ...customerProfile, ...data })
  }

  const renderAdditionalInputs = () => {
    return <React.Fragment>
      <div className="row">
        <DetailedInput
          containerClassName="--mr-2p"
          id="age"
          label="Age"
          placeholder="Number only"
          value={customerProfile?.age}
          onChange={(value) => onChange({ age: value })}
          type="number"
        />
        <DetailedInput
          id="sex"
          label="Sex"
          value={customerProfile?.sex}
          onChange={(value) => onChange({ sex: value })}
        />
      </div>

      <div className="row">
        <DetailedInput
          containerClassName="--mr-2p"
          id="height"
          label="Height"
          subLabel={`Example: 5'10"`}
          placeholder={"In Ft. (Feet) and In. (Inches)"}
          value={customerProfile?.height}
          onChange={(value) => onChange({ height: value })}
        />
        <DetailedInput
          id="weight"
          label="Weight"
          subLabel={`Example: 170`}
          placeholder={"Number only, in Lbs. (Pounds)"}
          value={customerProfile?.weight}
          onChange={(value) => onChange({ weight: value })}
          type="number"
        />
    </div>
    <DetailedInput
      containerClassName="--mb-20px"
      id="occupation"
      label="Occupation"
      placeholder="Your current occupation"
      value={customerProfile?.occupation}
      width={'100%'}
      onChange={(value) => onChange({ occupation: value })}
    />
    </React.Fragment>
  }

  const renderPainDegreeInput = () => {
    return <React.Fragment>
      <LabeledInput 
        className="painDegree --mb-20px"
        id="painDegree"
        label="Rate your overall degree of pain right now from 1-10:"
        onChange={(value) => {
          let val = value
          if (value === '') {
            val = '';
          } else if (value < 1) {
            val = 1;
          } else if (value > 10) {
            val = 10;
          } else {
            val = value;
          }
          onChange({ painDegree: val })
        }}
        placeholder="Number 1-10 only"
        type="number"
        value={customerProfile?.painDegree}
        max="10"
        min="1"
      />

      <LabeledInput 
        id="painDuration"
        className="--mb-5px"
        label="How long have you been experiencing pain?"
        onChange={(value) => onChange({ painDuration: value })}
        value={customerProfile?.painDuration}
      />
    </React.Fragment>
  }

  return <section className="ConditionForm">
    {renderAdditionalInputs()} 

    <div className="--options-container">
      <p><i>Please select <em>one</em> of the following:</i></p>
        {
          firstPageQuestions[1].options
            .map((option, index) => {
              return <SingleSelect
                key={index}
                isSelected={customerProfile?.acutePainType === option}
                option={option}
                selectOption={(option) => onChange({
                  acutePainType: option
                })}
              />
            }
          )
        }
      </div>

      <div className="--options-container --multiple-selects">
        <p><i>-OR- select <em>one or more</em> of the following:</i></p>

        <MultipleSelects
          options={firstPageQuestions[2].options}
          selectedOptions={customerProfile?.painSummary}
          selectOptions={(options) => onChange({
            painSummary: options
          })}
        />
      </div>
   
      {renderPainDegreeInput()}
  </section>
}