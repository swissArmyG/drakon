import React, { useContext } from 'react'
import { 
  MultipleSelects,
  LabeledInput 
} from "../Assorted/Inputs"
import { CustomerContext } from '../../contexts'
import { SELECT_TYPE_VARIABLES } from '../../copies/homepage-form-options'

export const NestedQuestionsForm = ({
  nested=undefined,
  onChange
}) => {
  const { customerProfile } = useContext(CustomerContext)
  const { 
    MULTI_SELECT, 
    TEXT_INPUT 
  } = SELECT_TYPE_VARIABLES 

  return (
    <section className="NestedQuestionsForm">
      <div className="--left-border --mb-50px">
        {
          nested.type === MULTI_SELECT
          && <MultipleSelects
            className="--ml-10px"
            options={nested.options}
            selectedOptions={customerProfile?.[nested.attribute]}
            selectOptions={(options) => {
              onChange({ [nested.attribute]: options })
            }}
          />
        }

        {
          nested.type === TEXT_INPUT
          && nested.options.map((option, index) => {
            const { attribute } = option                

            return <LabeledInput
              key={index}
              className="--ml-10px --mb-5px"
              id={attribute}
              index={index}
              label={option.question}
              value={customerProfile?.[attribute]}
              onChange={(value) => {
                onChange({ [attribute]: value })
              }}
            />
          })
        } 
      </div>
    </section>
  )
}