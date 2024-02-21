import { 
  FadedButtonEducation,
  FadedButtonPricing,
  FadedButtonOurStory
} from "../img/buttons"

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