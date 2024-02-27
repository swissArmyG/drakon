import { forwardRef } from "react"
import { ArrowUp } from '.'
import { Link } from 'react-router-dom'

export const SideButton = forwardRef((_, ref) => {
  return (
    <section className="SideButton --container">
      <Link to="#"
        onClick={() => ref.current.scrollIntoView({ behavior: 'smooth' })}>
        <ArrowUp />
      </Link>
    </section>
  )
})