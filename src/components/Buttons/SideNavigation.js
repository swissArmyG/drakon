import { forwardRef } from "react"
import { ArrowUp } from '.'
import { Tooltip } from '../Assorted'
import { Link } from 'react-router-dom'

export const SideNavigation = forwardRef((_, ref) => {
  return (
    <Tooltip text="Back to Top" right="13px">
      <section className="SideNavigation --container">
        <Link to="#"
          onClick={() => ref.current.scrollIntoView({ behavior: 'smooth' })}>
          <ArrowUp />
        </Link>
      </section>
    </Tooltip>
  )
})