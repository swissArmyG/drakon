/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, CustomerContext } from '../../contexts'
import { readCustomerByUserId } from '../../api/customers'

export const HomepageNav = forwardRef((_, refs) => {
  const { storyRef, consultationRef } = refs
  const { userData } = useContext(AuthContext)
  const { 
    customerProfile, 
    page,
    setOriginalCustomerProfile, 
    setCustomerProfile 
  } = useContext(CustomerContext)

  const scrollConfig = { behavior: "smooth" }

  const readCustomer = async () => {
    try {
      const customer = await readCustomerByUserId(userData?.id)
      const data = { ...customer, phoneNumber: customer.phone_number }
      
      setOriginalCustomerProfile(data)
      setCustomerProfile(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userData && !customerProfile) {
      readCustomer()
    }
  }, [userData])

  const navOptions = {
    consultation: {
      onClick: () => consultationRef.current.scrollIntoView(scrollConfig),
      linkTo: `?page=${page}#consultation`,
      text: 'REQUEST CONSULTATION'
    },
    story: {
      onClick: () => storyRef.current.scrollIntoView(scrollConfig),
      linkTo: '#story',
      text: 'OUR STORY'
    },
    spineAnatomy: {
      onClick: () => {},
      linkTo: '/anatomy',
      text: 'SPINE ANATOMY / PATHOLOGY'
    }
  }

  return (
    <section className="HomepageNav">
      <div className="--nav-options">
        {
          Object.keys(navOptions).map((op, idx) => {
            const text = navOptions[op].text

            return <React.Fragment key={idx}>
              <Link
                to={`${navOptions[op]?.linkTo}`}
                onClick={navOptions[op].onClick}>
                <h4 className={`--nav-option --button ${op}`}>
                  {text}
                </h4>
              </Link>
            </React.Fragment>
          })
        }
      </div>
    </section>
  )
})