import { useState } from 'react';

export const ArrowUp = () => {
  const [isHover, setIsHover] = useState(false)
  const color = isHover ? '#FFC655' : 'darkgrey'

  return (
    <svg
      className="ArrowUp --button"
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      version="1.1" 
      x="0px" y="0px" 
      viewBox="0 0 100 125"
      enableBackground="new 0 0 100 100"
      xmlSpace="preserve"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}>
        <g>
          <polygon fill={color} points="45,41.4 45,77.7 55,77.7 55,41.4 71.3,57.7 78.4,50.6 50.1,22.3 50,22.4 49.9,22.3 21.6,50.6    28.7,57.7  "/>
          <path fill={color} d="M50,100c27.6,0,50-22.4,50-50c0-27.6-22.4-50-50-50C22.4,0,0,22.4,0,50C0,77.6,22.4,100,50,100z M50,5   c24.8,0,45,20.2,45,45S74.8,95,50,95S5,74.8,5,50S25.2,5,50,5z"/>
        </g>
      </svg>
  )
}