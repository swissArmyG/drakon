import React, { useContext } from "react"
import { CustomerContext } from "../../contexts"

export const InputContainer = () => {
  const { 
    painDegree,
    setPainDegree,
  } = useContext(CustomerContext)

  return (
    <section className="InputContainer">
      <label htmlFor="painDegree">Rate your overall degree of pain right now from 1-10:</label>

      <input id="painDegree" type="number" max="10"
        value={painDegree > 0 ? painDegree : ''}
        onChange={({ target: { value }}) => {
          if (value < 1 || !value || value.length === 0) {
            value = 0
          }
          if (value > 10) {
            value = 10
          }
          setPainDegree(value)
        }}
      />
    </section>
  )
}