import { FadedButtonEducation } from "../img/buttons/FadedButtonEducation.js"
import { FadedButtonPricing } from "../img/buttons/FadedButtonPricing.js"
import { FadedButtonOurStory } from "../img/buttons/FadedButtonOurStory.js"

export const LandingPageMenu = () => {

  return (
    <section className="LandingPageMenu --container">
      <div className="LandingPageMenu --menu-options">
        <FadedButtonEducation />
        <FadedButtonPricing />
        <FadedButtonOurStory />
      </div>
    </section>
  )
}