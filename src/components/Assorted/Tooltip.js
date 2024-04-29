import React, { useState } from 'react'

export const Tooltip = ({ children, text, position, right }) => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <section className="Tooltip">

      {isVisible && (
        <span className={`--tooltip-content ${position
          ? position 
          : ''}`}
          style={{ 'right': right }}>
          {text}
        </span>
      )}

      <div onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}>
        {children}
      </div>
    </section>
  );
};