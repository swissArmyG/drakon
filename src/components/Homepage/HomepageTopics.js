import { FadedBgButton } from '../Buttons/FadedBgButton';
import topics from '../../copies/homepage-topics';

export const HomepageTopics =  ({ topic, setTopic, closeOverlappingModal }) => {
  const renderTopicContent = (category, idx) => {
    return <div className={`--modal -box-${idx}`}>
      <div>
        <h3 className="--button --button-text -exit" 
          onClick={() => setTopic(undefined)}>
          X
        </h3>
      </div>
      <em>{topics[category].header}</em>
      <p className="--modal-text">{topics[category].description}</p>
    </div>
  }

  return (
    <section className="HomepageTopics --container">
      {
        Object.keys(topics).map((topicCategory, index) => {
          console.log(topicCategory === topic, topicCategory, 'vs', topic)
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