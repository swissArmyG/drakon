export const MultipleSelects = ({
  additionalClassName="",
  className="",
  options,
  selectedOptions=[],
  selectOptions,
}) => {
  const optionsArray = Array.isArray(options) 
    ? options 
    : Object.keys(options);

  const isSelected = (option) => {
    return selectedOptions.includes(option) ? '--selected' : '';
  };

  const determineMultipleOptions = (option) => {
    if (isSelected(option)) {
      selectOptions(selectedOptions.filter(op => op !== option))
    } else {
      selectOptions([...selectedOptions, option])
    }
  }

  return (
    <section className={`MultipleSelects ${className}`}>
      {
        optionsArray.map((option, index) => {
          const label = Array.isArray(options) 
            ? option 
            : options[option];
          
          return <div key={index} className='--option-container'>
            <div 
              className={`--checkbox --button ${isSelected(label)} ${additionalClassName}`} 
              onClick={(e) => {
                e.preventDefault()
                determineMultipleOptions(label)
              }}/>

            <p className={`--checkoption ${isSelected(label)}`}>
              {label}
            </p>
          </div>
        })
      }
    </section>
  )
}