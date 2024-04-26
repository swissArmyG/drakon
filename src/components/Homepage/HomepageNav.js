import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

export const HomepageNav = forwardRef((_, refs) => {
  const { storyRef, requestApptRef, contactRef } = refs

  const scrollConfig = { behavior: "smooth" }

  const navOptions = {
    login: {
      onClick: undefined,
      text: 'LOGIN'
    },
    story: {
      onClick: () => storyRef.current.scrollIntoView(scrollConfig),
      linkTo: '#story',
      text: 'OUR STORY'
    },
    requestAppt: {
      onClick: () => requestApptRef.current.scrollIntoView(scrollConfig),
      linkTo: '#requestAppt',
      text: 'REQUEST APPOINTMENT'
    },
    contact: {
      onClick: () => contactRef.current.scrollIntoView(scrollConfig),
      linkTo: '#contact',
      text: 'CONTACT'
    }
  }

  return (
    <section className="HomepageNav --container">
      <div className="HomepageNav --nav -options">
        {
          Object.keys(navOptions).map((op, idx) => {
            return <Link to={`${navOptions[op].linkTo}`}
              onClick={navOptions[op].onClick}>
              <h4 key={idx} className="HomepageNav --nav -option --button">{navOptions[op].text}</h4>
            </Link>
          })
        } 
      </div>
      <p className="HomepageNav --nav -info"> 
          To empower individuals with unparalleled access to<br/>
          expert medical opinions, fostering confidence and<br/>
          informed decision-making in their healthcare journey.
        </p>
    </section>
  )
})