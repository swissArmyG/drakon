import { forwardRef } from 'react'
import { 
  FadedButtonEducation,
  FadedButtonPricing,
  FadedButtonOurStory
} from '../Buttons'
import { Link } from 'react-router-dom'

export const HomepageMenu = forwardRef((_, refs) => {
  const { educationRef, pricingRef, storyRef } = refs

  return (
    <section className="HomepageMenu --container">
      <nav className="HomepageMenu --menu-options">
        <Link to="#education" 
          onClick={() => educationRef.current.scrollIntoView({ behavior: "smooth" })}>
          <FadedButtonEducation />
        </Link>

        <Link to="#pricing" 
          onClick={() => pricingRef.current.scrollIntoView({ behavior: "smooth" })}>
          <FadedButtonPricing />
        </Link>

        <Link to="#story"
          onClick={() => storyRef.current.scrollIntoView({ behavior: "smooth" })}>
          <FadedButtonOurStory />
        </Link>
      </nav>
    </section>
  )
})