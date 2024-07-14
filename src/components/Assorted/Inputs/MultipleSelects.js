export const MultipleSelects = ({
  options,
  selectedOptions,
  selectOptions,
}) => {

  const isMultipleSelected = (option) => {
    return selectedOptions.includes(option) ? '--selected' : ''
  }

  const determineMultipleOptions = (optionCategory) => {
    selectOptions(prevState => {
      if (isMultipleSelected(optionCategory)) {
        return prevState.filter(op => op!== optionCategory)
      } else {
        return [...prevState, optionCategory]
      }
    })
  }

  return (
    <section className="MultipleSelects">
      {
        Object.keys(options).map((optionCategory, index) => {
          return <div key={index} className='--option-container'>
            <div 
              className={`--checkbox --button ${isMultipleSelected(optionCategory)}`} 
              onClick={(e) => {
                e.preventDefault()
                determineMultipleOptions(optionCategory)
              }}/>
            <p className={`--checkoption ${isMultipleSelected(optionCategory)}`}>
              {options[optionCategory]}
            </p>
          </div>
        })
      }
    </section>
  )
}