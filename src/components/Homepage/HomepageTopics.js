import { FadedBgButton } from '../Buttons/FadedBgButton';
import topics from '../../copies/homepage-topics';

export const HomepageTopics =  ({ topic, setTopic }) => {
  const renderTopicContent = (category, idx) => {
    return <div className={`--modal -box-${idx}`}>
      <em>{topics[category].header}</em>
      <p className="--modal-text">{topics[category].description}</p>
    </div>
  }

  return (
    <section className="HomepageTopics --container">
      {
        Object.keys(topics).map((topicCategory, index) => {
          return <div
          key={index}
           className="--topics-container">
            <div className="--button-container">
              <FadedBgButton
                buttonText={topicCategory} 
                onClick={(e) => {
                  e.preventDefault()
                  setTopic(topic === topicCategory ? undefined : topicCategory)
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