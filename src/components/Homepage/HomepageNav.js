
export const HomepageNav = () => {
  const navOptions = [
    "LOGIN",
    "CONTACT",
    "SPINE CHART"
  ]

  return (
    <section className="HomepageNav --container">
      <div className="HomepageNav --nav -options">
        {
          navOptions.map((navOp, idx) => {
            return <p key={idx} className="HomepageNav --nav -option --button">{navOp}</p>
          })
        }
      </div>
      <p className="HomepageNav --nav -info">
      Empowering individuals with unparalleled access to<br/>
      expert medical opinions, fostering confidence and<br/>
      informed decision-making in their healthcare journey.
      </p>
    </section>
  )
}