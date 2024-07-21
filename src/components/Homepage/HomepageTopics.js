import React  from 'react';
import { FadedBgButton } from '../Buttons/FadedBgButton';
import topics from '../../copies/homepage-topics';

export const HomepageTopics =  ({ topic, setTopic, closeOverlappingModal }) => {
  const renderLeftPane = (category) => {
    return (
      <div className="--left-pane">
        <p className="--minus-margin"><em>Basic Spine Anatomy </em> {topics[category].basicSpineAnatomy}</p>
        <p><em>Pathology </em>{topics[category].pathology}</p>
        <p><em>Clinical Conditions </em>{topics[category].clinicalConditions}</p>
        <p><em>Physical Exam Items </em>{topics[category].physicalExamItems}</p>
        <p><em>Treatment Options </em>{topics[category].treatmentOptions}</p>
        <p><em>Fun Fact </em>{topics[category].funFact}</p>
      </div>
    )
  }

  const renderRightPane = (category) => {
    return (
      <div className="--right-pane">
        <img src={topics[category].imageURL} alt={topics[category].header}/>
      </div>
    )
  }
  
  const renderTopicContent = (category, idx) => {  
    return <div className={`--modal -box-${idx}`}>
      <div>
        <h3 className="--button --button-text -exit" 
          onClick={() => setTopic(undefined)}>
          X
        </h3>
      </div>
      <h3 className="--header"><em>{topics[category].header}</em></h3>

      <div className="--panes-container">
        {renderLeftPane(category)}
        {renderRightPane(category)}
      </div>
    </div>
  }

  return (
    <section className="HomepageTopics --container">
      {
        Object.keys(topics).map((topicCategory, index) => {
          return <div key={index} className="--topics-container">
            <div className="--button-container">
              <FadedBgButton
                isFocused={topicCategory === topic}
                buttonText={topicCategory} 
                onClick={(e) => {
                  e.preventDefault()
                  setTopic(topic === topicCategory ? undefined : topicCategory)
                  closeOverlappingModal()
                }}
                width="300px"
              />
            </div>
            {
              topicCategory === topic &&
              <div className={`--modal-container`}>
                {renderTopicContent(topicCategory, index)}
              </div>
            }
          </div>
        })
      }
    </section>
  )
}