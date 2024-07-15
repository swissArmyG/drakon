import React, { useContext } from 'react'
import { 
  SingleSelect, 
  MultipleSelects,
  LabeledInput 
} from "../Assorted/Inputs"
import { NestedQuestionsForm } from './NestedQuestionsForm'
import { 
  additionalQuestions, 
  SELECT_TYPE_VARIABLES 
} from '../../copies/homepage-form-options'
import { CustomerContext } from '../../contexts'

export const AdditionalQuestionsForm = () => {
  const { SINGLE_SELECT, MULTI_SELECT, TEXT_INPUT } = SELECT_TYPE_VARIABLES

  const { 
    customerProfile,
    setCustomerProfile 
  } = useContext(CustomerContext)

  const onChange = (data) => {
    setCustomerProfile({ ...customerProfile, ...data })
  }

  const renderSingleSelect = ({
    attribute,
    index,
    op 
  }) => {
    return <SingleSelect 
      index={index}
      isSelected={customerProfile?.[attribute]?.answer === op}
      option={op}
      selectOption={(option) => {
        onChange({ 
          [attribute]: { answer: option } 
        })
      }}
    />
  }

  const renderMultiSelects = ({
    attribute,
    options,
  }) => {
    return <MultipleSelects
      className="row"
      options={options}
      selectedOptions={customerProfile?.[attribute] || []}
      selectOptions={(options) => {
        onChange({ [attribute]: options })
      }}
    />
  }

  const renderLabeledInput = ({
    attribute,
    question
  }) => {
    return <LabeledInput
      className="--mb-20px"
      id={attribute}
      label={question}
      onChange={(value) => {
        onChange({ [attribute]: value })
      }}
    />
  }

  const determineInputTypes = (entry) => {
    const { 
      attribute, 
      options, 
      question, 
      type 
    } = entry

    switch (type) {
      case SINGLE_SELECT:
      return options.map((op, idx)=> {
        return renderSingleSelect({attribute, idx, op})
      })

      case MULTI_SELECT:
        return renderMultiSelects({attribute, options})

      case TEXT_INPUT:
        return renderLabeledInput({attribute,question})

      default:
        return;
    }
  }

  console.log(customerProfile)

  return <section className="AdditionalQuestionsForm">
    {
      Object
        .keys(additionalQuestions)
        .map((key, index) => {
          const entry = additionalQuestions[key]
          const { attribute, ifYes, question, type } = entry

          const _ifYes = ifYes && customerProfile?.[attribute]?.answer === "Yes"
          
          return <React.Fragment key={index}>
            {(type === SINGLE_SELECT 
              || type ===   MULTI_SELECT) 
              && <p>{question}</p>
            }

            <div className="row">
              {determineInputTypes(entry)}
            </div>

            { 
              _ifYes && <NestedQuestionsForm 
                attribute={attribute}
                nestedQuestions={ifYes}
                onChange={onChange}
              />
            }
          </React.Fragment>
        })
    }
  </section>
}