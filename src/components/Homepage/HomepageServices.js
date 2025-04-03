import { forwardRef } from "react"
import { SlideContent } from "../Assorted"
import { topics } from "../../copies/drakon-home"

export const HomepageServices = forwardRef((_, ref) => {
  return (
    <section className="HomepageServices section-container" ref={ref}>
      <SlideContent topics={topics} />
    </section>
  )
})