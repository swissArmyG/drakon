import { forwardRef } from "react"

export const SideButton = forwardRef((_, ref) => {
  return (
    <section className="SideButton --container">
      <button className="backToTop --button"
        onClick={() => ref.current.scrollIntoView({ behavior: 'smooth' })}>
        Back to Top
      </button>
    </section>
  )
})