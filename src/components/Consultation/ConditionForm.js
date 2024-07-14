import React, { useContext } from "react"
import { 
  singleSelectOption, 
  multipleSelectOptions 
} from '../../copies/homepage-form-options'
import { CustomerContext } from "../../contexts"
import { DetailedInput, LabeledInput, SingleSelect } from "../Assorted/Inputs"
import { MultipleSelects } from "../Assorted/Inputs/MultipleSelects"

export const ConditionForm = () => {
  const { 
    customerProfile,
    singleOption,
    multipleOptions,
    painDegree,
    selectSingleOption,
    selectMultipleOptions,
    setCustomerProfile,
    setPainDegree
  } = useContext(CustomerContext)

  const isSingleSelected = (option) => {
    return singleOption === option ? '--selected' : ''
  }

  const determineSingleOption = (option) => {
    if (singleOption === option) {
      return '';
    } else {
      return option;
    }
  };

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

      <div className="row --mb-20px">
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
    </React.Fragment>
  }

  const renderPainDegreeInput = () => {
    return <React.Fragment>
      <LabeledInput 
        className="painDegree"
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
          setPainDegree(val)
        }}
        placeholder="Number 1-10 only"
        type="number"
        value={painDegree}
        max="10"
        min="1"
      />

      <LabeledInput 
        id="painDuration"
        label="How long have you been experiencing pain"
        onChange={(value) => {
          onChange({ ...customerProfile, painDuration: value })
        }}
        value={customerProfile?.painDuration}
      />
    </React.Fragment>
  }

  return <section className="ConditionForm">
    {renderAdditionalInputs()} 

    <div className="--options-container">
      <p><i>Please select <em>one</em> of the following:</i></p>
        {
          Object
            .keys(singleSelectOption)
            .map((option, index) => {
              const _option = determineSingleOption(option)
              return <SingleSelect 
                index={index}
                isSelected={isSingleSelected(option)}
                option={singleSelectOption[option]}
                selectOption={() => selectSingleOption(_option)}
              />
            }
          )
        }
      </div>

      <div className="--options-container --mb-50px">
        <p><i>-OR- select <em>one or more</em> of the following:</i></p>
        <MultipleSelects 
          options={multipleSelectOptions}
          selectedOptions={multipleOptions}
          selectOptions={selectMultipleOptions}
        />
      </div>
   
      {renderPainDegreeInput()}
  </section>
}