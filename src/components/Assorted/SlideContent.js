import { useState } from 'react'
import { Image } from '.'

export const SlideContent = ({ topics }) => {
  const [slideIndex, setSlideIndex] = useState(0)

  const renderSlideContent = () => {
    return <div className="flex column align-center">
      <h1>{topics[slideIndex].title}</h1>
      <p>{topics[slideIndex].content}</p>
      <span>{topics[slideIndex].author}</span>
    </div>
  }

  const renderSlideNav = () => {
    return Object.keys(topics).map(key => {
      const iconClass = key === slideIndex
        ? "fa-solid fa-circle" 
        : "fa-regular fa-circle"
          
      return <i 
        className={iconClass} 
        onClick={() => setSlideIndex(key)} 
      />
    })
  }

  return <section className="SlideContent flex column align-center">
    <Image size="M" />
    {renderSlideContent()}
    <div className="flex row justify-center">{renderSlideNav()}</div>
  </section>
}