/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import { 
  SingleSelect, 
  MultipleSelects,
  LabeledInput 
} from "../Assorted/Inputs"
import { NestedQuestionsForm } from './NestedQuestionsForm'
import { SELECT_TYPE_VARIABLES } from '../../copies/homepage-form-options'
import { CustomerContext } from '../../contexts'

export const AdditionalQuestionsForm = () => {
  const { SINGLE_SELECT, MULTI_SELECT, TEXT_INPUT } = SELECT_TYPE_VARIABLES

  const { 
    customerProfile,
    paginatedQuestions,
    setCustomerProfile 
  } = useContext(CustomerContext)

  const onChange = (data) => {
    setCustomerProfile({ ...customerProfile, ...data })
  }

  const renderSingleSelect = ({
    attribute,
    ifYes,
    index,
    op 
  }) => {
    return <SingleSelect 
      key={index}
      isSelected={customerProfile?.[attribute] === op}
      option={op}
      selectOption={(option) => {
        if (ifYes) {
          const nestedAttributes = ifYes.options.map(_option => _option.attribute)

          option === 'Yes' 
            ? onChange({ [attribute]: option })
            : nestedAttributes.map(attr => delete customerProfile?.[attr])
        }
        onChange({ [attribute]: option })
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
      selectedOptions={customerProfile?.[attribute]}
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
      value={customerProfile?.[attribute]}
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
      ifYes=undefined,
      type 
    } = entry

    switch (type) {
      case SINGLE_SELECT:
      return options.map((op, index)=> {
        return renderSingleSelect({attribute, ifYes, index, op})
      })

      case MULTI_SELECT:
        return renderMultiSelects({attribute, options})

      case TEXT_INPUT:
        return renderLabeledInput({attribute, question})

      default:
        return;
    }
  }

  return <section className="AdditionalQuestionsForm">
    {
      paginatedQuestions && Object
      .keys(paginatedQuestions)
      .map((key, index) => {

        const entry = paginatedQuestions[key]
        const { attribute, ifYes, question, type } = entry

        const _ifYes = ifYes && customerProfile?.[attribute] === "Yes"
          
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
                nested={ifYes}
                onChange={onChange}
              />
            }
          </React.Fragment>
      })
    }
  </section>
}