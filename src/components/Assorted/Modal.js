import React, { useState, useEffect } from 'react'

export const Modal = ({ children, index, isOpen, header, onClose, scrollable }) => {
  const [_isOpen, setIsOpen] = useState(isOpen)

  useEffect(() => {
    setIsOpen(isOpen)
  }, [isOpen])

  return (
    <React.Fragment>
      { _isOpen && 
        <section className={`Modal ${scrollable ? '--scrollable' : ''}`}>
          <div className={`--modal -box-${index}`}>
          <div>
            <h3 className="--button --button-text -exit" 
              onClick={() => {
                setIsOpen(!isOpen)
                onClose && onClose()
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