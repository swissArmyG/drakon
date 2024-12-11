export const SingleSelect = ({ 
  additionalClassName='',
  isSelected=false,
  option,
  selectOption
}) => {
  const selected = isSelected ? '--selected' : ''

  return <section className="SingleSelect">
    <div className='--option-container'>
      <div 
        className={`--checkbox --button ${selected} ${additionalClassName}`} 
        onClick={(e) => {
          e.preventDefault()
          selectOption(option)
      }}/>
              
      <p className={`--checkoption ${selected}`}>
        {option}
      </p>
    </div>
  </section>
} 