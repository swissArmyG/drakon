import React, { useState } from 'react'
import { FadedBgButton } from '../Buttons/FadedBgButton';
import upperTextbox from '../../img/shapes/ocean_upper_textbox.png'
import lowerTextbox from '../../img/shapes/ocean_lower_textbox.png'
import topics from '../../copies/homepage-topics';

export const HomepageTopics =  () => {
  const [ currentCategory, setCurrentCategory ] = useState(undefined)
  const upperTextboxTopics = ['UPPER SPINE', 'MID-UPPER SPINE']
  const lowerTextboxTopics = ['MID-LOWER SPINE', 'LOWER SPINE']

  const renderCommonDisorders = (category) => {
    const disorder = topics[category].commonDisorders
    return Object
      .keys(disorder)
      .map(type => {
        return <p className="--textbox-text"><em>{type}</em> {disorder[type]}</p>
      })
  }

  const renderTopicContent = (category) => {
    return <div className="--textbox-content">
      <em>{topics[category].header}</em>
      <p className="--textbox-text"><em>Locations </em>{topics[category].location}</p>
      <p className="--textbox-text"><em>Function </em>{topics[category].function}</p>
      <p className="--textbox-text"><em>Common Problems/ Disorders </em>{renderCommonDisorders(category)}</p>
      <p className="--textbox-text"><em>Fun Facts </em>{topics[category].funFacts}</p>
    </div>
  }

  const renderTextbox = (category, idx) => {
    return <React.Fragment>
      {
        upperTextboxTopics.includes(category) &&
          <img
            className={`--textbox -box-${idx}`}
            src={upperTextbox}
            alt="Textbox" 
          />
      }
      {
        lowerTextboxTopics.includes(category) &&
          <img
            className={`--textbox -box-${idx}`}
            src={lowerTextbox}
            alt="Textbox" 
          />
      }
    </React.Fragment>
  }

  return (
    <section className="HomepageTopics --container">
      {
        Object.keys(topics).map((category, idx) => {
          return <div className="--topics-container">
            <FadedBgButton
              buttonText={category} 
              onClick={(e) => {
                e.preventDefault()
                setCurrentCategory(currentCategory === category ? undefined : category)
              }}
            />
            {
              category === currentCategory &&
              <div className="--textbox-container">
                {renderTextbox(category, idx)}
                {renderTopicContent(category)}
              </div>
            }
          </div>
        })
      }
    </section>
  )
}