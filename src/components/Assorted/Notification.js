import React, { useEffect, useState } from "react"

export const Notification = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!message || !type) {
      return setIsVisible(false)
    }
    return setIsVisible(true)
  }, [message, type])


  if (!isVisible) {
    return;
  }

  return (
    <section className={`Notification ${type}`}>
      { 
        isVisible && <React.Fragment>
          <h3 className="--button --button-text" 
            onClick={() => setIsVisible(false)}>
            X
          </h3>
          <p>{message}</p>
        </React.Fragment> 
      }
    </section>
  )
}