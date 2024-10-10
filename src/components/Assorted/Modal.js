import React, { useState, useEffect } from 'react'

export const Modal = ({ children, onClick, index, isOpen, header }) => {
  const [_isOpen, setIsOpen] = useState(isOpen)

  useEffect(() => {
    setIsOpen(isOpen)
  }, [isOpen])

  return (
    <React.Fragment>
      { _isOpen && 
        <section className="Modal --modal-container">
          <div className={`--modal -box-${index}`}>
          <div>
            <h3 className="--button --button-text -exit" 
              onClick={() => {
                setIsOpen(!isOpen)
                onClick && onClick()
              }}>
              X
            </h3>
          </div>
          <h3 className="--header"><em>{header}</em></h3>
            {children}
          </div>
        </section>
      }
    </React.Fragment>
  )  
}