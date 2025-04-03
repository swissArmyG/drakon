import { useEffect, useState } from 'react'

export const SlideContent = ({ topics }) => {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    setSlideIndex(0)
  }, [])

  const renderSlideContent = () => {
    return <div className="flex column align-center">
      <h1>{topics[slideIndex].title}</h1>
      <p>{topics[slideIndex].content}</p>
      <div className="author flex align-center">
        <hr style={{
          flex: '0 0 15px'
        }}/>
        <span>{topics[slideIndex].author}</span>
      </div>
    </div>
  }

  const renderSlideNav = () => {
    return Object.keys(topics).map((key, idx) => {
      const iconClass = idx === slideIndex || key === slideIndex
        ? "fa-solid fa-circle" 
        : "fa-regular fa-circle"
          
      return <i 
        className={iconClass} 
        onClick={() => setSlideIndex(key)} 
      />
    })
  }

  return <section className="SlideContent flex column align-center">
    {renderSlideContent()}
    <div className="flex row justify-center">{renderSlideNav()}</div>
  </section>
}