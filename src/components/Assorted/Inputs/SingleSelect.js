export const SingleSelect = ({ 
  isSelected=false,
  option,
  selectOption
}) => {
  const selected = isSelected ? '--selected' : ''

  return <section className="SingleSelect">
    <div className='--option-container'>
      <div 
        className={`--checkbox --button ${selected}`} 
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