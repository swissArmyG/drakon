import React, { useContext } from 'react'
import { 
  MultipleSelects,
  LabeledInput 
} from "../Assorted/Inputs"
import { CustomerContext } from '../../contexts'
import { SELECT_TYPE_VARIABLES } from '../../copies/homepage-form-options'

export const NestedQuestionsForm = ({
  attribute,
  nestedQuestions,
  onChange
}) => {
  const { customerProfile } = useContext(CustomerContext)
  const { 
    MULTI_SELECT, 
    TEXT_INPUT 
  } = SELECT_TYPE_VARIABLES

  const onAdditionalMultiSelect = (options) => {
    const entry = customerProfile?.[attribute]

    onChange({
      [attribute]: {
        ...entry,
        addition: options
      }
   })
  }

  const onAdditionalChange = ({ newAttribute, value}) => {
    onChange({ [newAttribute]: value })
  }

  return (
    <section className="NestedQuestionsForm">
      { nestedQuestions.map((entry, index) => {
        const { type, options } = entry
        
        return <React.Fragment key={index}>
          <div className="--left-border --mb-50px">
            {
              type === MULTI_SELECT
              && <MultipleSelects 
                className="--ml-10px"
                options={options}
                selectedOptions={customerProfile?.[attribute]?.addition}
                selectOptions={(options) => {
                  onAdditionalMultiSelect(options)
                }}
              />
            }

            {
              type === TEXT_INPUT
              && options.map(option => {
                const _attribute = option.attribute

                return <LabeledInput
                  className="--ml-10px --mb-5px"
                  id={_attribute}
                  label={option.question}
                  value={customerProfile?.[_attribute]}
                  onChange={(value) => {
                    onAdditionalChange({ 
                      newAttribute: _attribute,
                      value
                    })
                  }}
                />
              })
            } 
          </div>
        </React.Fragment>          
      })
    }
    </section>
  )
}